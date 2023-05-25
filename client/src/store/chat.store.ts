import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import React from "react";
import {v4 as uuidv4} from "uuid";

import {io} from "socket.io-client"
import {User} from "../models/user.model";
import {Message, Messages} from "../models/message.model";
import {EmojiClickData} from "emoji-picker-react";

const socket = io("http://localhost:5000")

interface chatStoreState {
    user: string,
    users: []
    message: string
    setMessage: (message: string) => void
    currentEmoji: string
    messages: []
    isLoading: boolean
    emojiToggle: boolean
    toggleEmojiPicker: () => void
    onEmojiClick: (emojiData: EmojiClickData) => void
    handleSendMessage: (e: React.ChangeEvent<HTMLFormElement>) => void
    handleNewMessage: () => void
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleUserSubmit: () => void
    handleConnectNewUser: () => void
    handleDisconnectUser: () => void
    handleLeaveUser: () => void
}

export const useChatStore = create<chatStoreState>()(
    devtools(
        persist(
            (set, get) => ({
                user: "",
                message: "",
                currentEmoji: "",
                users: [],
                messages: [],
                isLoading: false,
                emojiToggle: false,

                setMessage: (message) => {
                    set({message: message})
                },

                // emoji Picker funcs
                toggleEmojiPicker: () => {
                    set((state) => ({emojiToggle: !state.emojiToggle}))
                },

                onEmojiClick: (emojiData) => {
                    set({currentEmoji: emojiData.emoji})
                    set({message: get().message + emojiData.emoji})
                    set({emojiToggle: false})
                },

                // sending message funcs

                handleSendMessage: (e: React.ChangeEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    if (get().message.trim() && localStorage.getItem("username")) {
                        socket.emit("message", {
                            id: uuidv4(),
                            username: localStorage.getItem("username"),
                            text: get().message,
                            timestamp: new Date().toLocaleTimeString("ru-RU", {timeStyle: "short"})
                        })
                    }
                    set({message: ""})
                },

                handleNewMessage: () => {
                    socket.on("response", (data: Message) => {
                        // @ts-ignore
                        set({messages: [...get().messages, data]})
                    })
                },

                // users funcs
                handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    set({user: e.target.value})
                },

                handleUserSubmit: () => {
                    localStorage.setItem("username", get().user)


                    socket.emit('newUser', {
                        username: get().user,
                        id: uuidv4(),
                    })
                },

                handleConnectNewUser: () => {
                    socket.on('connectNewUser', (data: any) => set({users: data}))
                },

                handleDisconnectUser: () => {
                    socket.on('disconnected', (data: any) => set({users: data}))
                },

                handleLeaveUser: () => {
                    const leavingUser = get().users.find((user: User) => user.id)
                    localStorage.removeItem("username")
                    socket.emit('disconnectUser', leavingUser)
                }

            }), {name: "chat"})))