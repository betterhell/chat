import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {User} from "../models/user.model";
import socket from "../socket";
import {useUserStore} from "./user.store";


interface chatStoreState {
    isLoading: boolean
}

export const useChatStore = create<chatStoreState>()(
    devtools(
        (set, get) => ({
            isLoading: false,


        })))