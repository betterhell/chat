import {create} from "zustand";
import {devtools} from "zustand/middleware";
import React from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import {User} from "../models/user.model";
import {AuthResponse} from "../models/response/authResponse";
import {API_URL} from "../http";

interface useUserStore {
    user: User
    isAuth: boolean
    isLoading: boolean
    isError: string,
    registration: (username: string, email: string, password: string) => void
    login: (email: string, password: string) => void
    logout: () => void
    checkAuth: () => void
}


export const useUserStore = create<useUserStore>()(
    devtools(
        (set, get) => ({
            user: {
                id: "",
                username: "",
                password: "",
                activationLink: "",
                email: "",
                isActivatedEmail: false,
                birtDate: {
                    day: "",
                    month: "",
                    year: "",
                }
            },
            isAuth: false,
            isLoading: false,
            isError: "",

            registration: async (username, email, password) => {
                set({isLoading: true})
                try {
                    const response = await AuthService.registration(username, email, password)
                    console.log(response)
                    localStorage.setItem("token", response.data.accessToken)
                    set({isAuth: true})
                    set({user: response.data.user})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                }
            },

            login: async (email, password) => {
                set({isLoading: true})
                try {
                    const response = await AuthService.login(email, password)
                    console.log(response)
                    localStorage.setItem("token", response.data.accessToken)
                    set({isAuth: true})
                    set({user: response.data.user})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                }
            },


            logout: async () => {
                set({isLoading: true})
                try {
                    const response = await AuthService.logout()
                    localStorage.removeItem("token")
                    set({isAuth: false})
                    set({user: {} as User})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                }
            },

            checkAuth: async () => {
                set({isLoading: true})
                try {
                    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
                    console.log(response)
                    localStorage.setItem("token", response.data.accessToken)
                    set({isAuth: true})
                    set({user: response.data.user})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                } finally {
                    set({isLoading: false})
                }
            }
        })))