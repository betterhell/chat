import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {v4 as uuidv4} from "uuid";
import {socket} from "../socket";
import MessageService from "../services/MessageService";
import {useUserStore} from "./user.store";

interface messageStoreState {
    message: string,
    setMessage: (message: string) => void,
    currentEmoji: string
    isLoading: boolean
    typingStatus: string,
    isError: string,

    createMessage: (message: string) => void
}

export const useMessageStore = create<messageStoreState>()(
    devtools(
        (set, get) => ({
            message: "",
            messages: [],
            currentEmoji: "",
            isLoading: false,
            typingStatus: "",
            isError: "",

            setMessage: (message) => {
                set({message: message})
            },

            createMessage: async (message) => {
                set({isLoading: true})

                try {
                    if (message.trim() && useUserStore.getState().user.username) {
                        socket.emit("message", {
                            id: uuidv4(),
                            username: useUserStore.getState().user.username,
                            message,
                            timestamp: new Date().toLocaleTimeString("ru-RU", {timeStyle: "short"})
                        })
                        set({message: ""})
                    }
                    const {data} = await MessageService.createMessage(message)
                    set({message: data.message})
                    set({message: ""})
                    set({isLoading: false})
                } catch (error: any) {
                    set({isError: error.response?.data?.message})
                    set({isLoading: false})
                }
            }
        })))