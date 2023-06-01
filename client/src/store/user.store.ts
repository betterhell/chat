import {create} from "zustand";
import {devtools} from "zustand/middleware";
import React from "react";
import axios from "axios";

interface useUserStore {
    username: string,
    email: string,
    password: string,
    avatar: string,
    id: string,
    isError: {
        error: string,
        status: number,
    },
    isAuth: boolean,

    handleChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeId: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleIsError: (error: string, status: number) => void
    handleIsAuth: () => void
}


export const useUserStore = create<useUserStore>()(
    devtools(
        (set, get) => ({
            username: "",
            email: "",
            password: "",
            avatar: "",
            id: "",
            isError: {
                error: "",
                status: 200,
            },
            isAuth: false,

            handleChangeUsername: (e) => {
                set({username: e.target.value})
            },
            handleChangeEmail: (e) => {
                set({email: e.target.value})
            },
            handleChangePassword: (e) => {
                set({password: e.target.value})
            },
            handleChangeAvatar: (e) => {
                set({avatar: e.target.value})
            },
            handleChangeId: (e) => {
                set({id: e.target.value})
            },

            handleIsError: (error: string, status: number) => {
                set({isError: {error: error, status: status}})
            },

            handleIsAuth: () => {
                set({isAuth: true})
            }
        })))