import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {User} from "../models/user.model";
import socket from "../socket";
import {useUserStore} from "./user.store";


interface chatStoreState {
    isLoading: boolean
    socketSubscribe: () => void
}

export const useChatStore = create<chatStoreState>()(
    devtools(
        (set, get) => ({
            isLoading: false,

            socketSubscribe: () => {
                socket.on("connect", () => {
                    console.log(new Date())
                })
            }

        })))