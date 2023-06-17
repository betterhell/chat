import {create} from "zustand";
import {devtools} from "zustand/middleware";
import React from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import {User} from "../models/user.model";
import {AuthResponse} from "../models/response/authResponse";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import foundUser from "../components/SearchUser/components/FoundUser/FoundUser";

interface useUserStore {
    user: User
    foundUser: User
    isAuth: boolean
    isLoading: boolean
    isError: string,
    registration: (username: string, email: string, password: string) => void
    login: (email: string, password: string) => void
    logout: () => void
    checkAuth: () => void
    findUser: (username: string) => void
    addToFriends: (username: string) => void
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
            foundUser: {
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
                    set({isError: error.response?.data?.message})
                    set({isLoading: false})
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
                    set({isError: error.response?.data?.message})
                }
            },

            findUser: async (username) => {
                set({foundUser: {} as User})
                try {
                    const {data} = await UserService.fetchUser(username)
                    console.log(data)
                    set({foundUser: data})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: "User does not exist", isLoading: false})
                }
            },

            addToFriends: async (username) => {
                try {
                    const {data} = await UserService.addToFriend(username)
                    console.log(data)
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: "User does not exist", isLoading: false})
                }
            }
        })))