import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {User} from "../models/user.model";
import {socket} from "../socket";


interface chatStoreState {
    user: User | null
    users: User[]
    currentEmoji: string
    isLoading: boolean
    handleConnectNewUser: () => void
    handleDisconnectUser: () => void
}

export const useChatStore = create<chatStoreState>()(
    devtools(
        (set, get) => ({
            user: null,
            currentEmoji: "",
            users: [],
            isLoading: false,


            handleConnectNewUser: () => {
                socket.on("user:responseConnect", ((newUser: any) => {
                    const newUserList = [...get().users, newUser]
                    set((prevState: any) => ({users: [...prevState, ...newUserList]}))
                    console.log(get().users)
                }))
            },

            handleDisconnectUser: () => {
                socket.on("user:responseDisconnect", ((newUser: any) => {
                    const newUserList = get().users.filter(user => user?.id !== newUser?._id)
                    set({users: newUserList})
                }))
            },

        })))