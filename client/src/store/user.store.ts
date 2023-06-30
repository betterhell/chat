import {create} from "zustand";
import {devtools} from "zustand/middleware";
import axios from "axios";
import AuthService from "../services/AuthService";
import {User} from "../models/user.model";
import {AuthResponse} from "../models/response/authResponse";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import socket from "../socket";
import login from "../components/Login/Login";

interface useUserStore {
    users: User[]
    user: User | null
    foundUser: User | null
    isAuth: boolean
    isLoading: boolean
    isError: string,
    registration: (username: string, email: string, password: string) => void
    login: (email: string, password: string) => void
    logout: () => void
    checkAuth: () => void
    findUser: (username: string) => void
    addToFriends: (user: User) => void
    updateUsers: (users: User[]) => void
}

export const useUserStore = create<useUserStore>()(
    devtools(
        (set, get) => ({
            users: [],
            user: null,
            foundUser: null,
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
                    socket.emit("user:connectMessage", response.data.user.username)
                    socket.emit("connect", response.data.user)
                } catch (error: any) {
                    set({isError: "User already exist or incorrect credentials"})
                    set({isLoading: false})
                }
            },

            login: async (email, password) => {
                set({isLoading: true})
                try {
                    const {data} = await AuthService.login(email, password)
                    localStorage.setItem("token", data.accessToken)
                    set({user: data.user})
                    set({isLoading: false})
                    set({isAuth: true})
                    socket.emit("user:connectMessage", data.user.username)
                    socket.emit("connect", data.user)
                } catch (error: any) {
                    set({isError: "User does not exist!"})
                    set({isLoading: false})
                }
            },

            logout: async () => {
                set({isLoading: true})
                try {
                    await AuthService.logout()
                    localStorage.removeItem("token")
                    set({isAuth: false})
                    set({isLoading: false})
                    socket.emit("user:disconnectMessage", get().user?.username)
                    socket.emit("disconnect", get().user)
                    set({user: null})
                } catch (error: any) {
                    set({isError: error.response?.data?.message, isLoading: false})
                }
            },

            checkAuth: async () => {
                set({isLoading: true})
                try {
                    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
                    localStorage.setItem("token", response.data.accessToken)
                    set({isAuth: true})
                    set({user: response.data.user})
                    set({isLoading: false})
                    socket.emit("connect", response.data.user)
                } catch (error: any) {
                    set({isError: error.response?.data?.message})
                }
            },

            findUser: async (username) => {
                set({isLoading: true})
                set({foundUser: null})
                try {
                    const {data} = await UserService.fetchUser(username)
                    set({foundUser: data})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: "User does not exist!", isLoading: false})
                }
            },

            updateUsers: (users) => {
                set({users: users})
            },

            addToFriends: async (user) => {
                set({isLoading: true})
                try {
                    const res = await UserService.addToFriend(user)

                    if (!res) {
                        throw new Error("User already in friends!")
                    }

                    set({isLoading: false})
                } catch (error: any) {
                    console.log(error)
                    set({isError: error, isLoading: false})
                }
            }
        })))