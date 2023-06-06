import {create} from "zustand";
import {devtools} from "zustand/middleware";
import React from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import {User} from "../models/user.model";

interface useUserStore {
    user: User
    isAuth: boolean
    isLoading: boolean
    isError: string,
    registration: (username: string, email: string, password: string) => void
    login: (email: string, password: string) => void
    logout: () => void
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
            isLoading: true,
            isError: "",

            registration: async (username, email, password) => {
                try {
                    set({isLoading: false})
                    const response = await AuthService.registration(username, email, password)
                    console.log(response)
                    localStorage.setItem("token", response.data.accessToken)
                    set({isAuth: true})
                    set({user: response.data.user})
                    set({isLoading: true})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                }
            },

            login: async (email, password) => {
                try {
                    set({isLoading: false})
                    const response = await AuthService.login(email, password)
                    console.log(response)
                    localStorage.setItem("token", response.data.accessToken)
                    set({isAuth: true})
                    set({user: response.data.user})
                    set({isLoading: true})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                }
            },


            logout: async () => {
                try {
                    set({isLoading: false})
                    const response = await AuthService.logout()
                    localStorage.removeItem("token")
                    set({isAuth: false})
                    set({user: {} as User})
                    set({isLoading: true})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: true})
                }
            }
        })))