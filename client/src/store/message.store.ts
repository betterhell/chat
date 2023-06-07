import {create} from "zustand";
import {devtools} from "zustand/middleware";
import React from "react";
import {v4 as uuidv4} from "uuid";
import {User} from "../models/user.model";
import {Message} from "../models/message.model";
import {socket} from "../socket";

interface messageStoreState {
    user: string,
    users: User[]
    message: string
    setMessage: (message: string) => void
    currentEmoji: string
    messages: Message[]
    isLoading: boolean
    typingStatus: string,
    setTypingStatus: (value: string) => void
    handleSendMessage: (e: React.ChangeEvent<HTMLFormElement>) => void
    handleNewMessage: (data: Message) => void
    handleStartTyping: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleEndTyping: () => void
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleUserSubmit: () => void
    handleConnectNewUser: (data: User) => void
    handleDisconnectUser: (data: User) => void
    handleLeaveUser: () => void
}

export const useMessageStore = create<messageStoreState>()(
    devtools(
        (set, get) => ({
            username: "",
            password: "",
            user: "",
            message: "",
            currentEmoji: "",
            users: [],
            messages: [],
            isLoading: false,
            typingStatus: "",

            setMessage: (message) => {
                set({message: message})
            },

            setTypingStatus: (value) => {
                set({typingStatus: value})
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

            handleNewMessage: (data) => {
                // @ts-ignore
                set({messages: [...get().messages, data]})
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

            handleStartTyping: (e) => {
                if (e.code === "Backspace" || e.code === "Space") {
                    return
                }
                socket.emit('startTyping', `${useMessageStore.getState().user} is typing`)
            },

            handleEndTyping: () => {
                setTimeout(() => {
                    socket.emit('endTyping', "")
                }, 1000)
            },

            handleConnectNewUser: (data) => {
                // @ts-ignore
                set({users: data})
            },

            handleDisconnectUser: (data) => {
                // @ts-ignore
                set({users: data})
            },

            handleLeaveUser: () => {
                const leavingUser = get().users.find((user: User) => user.id)
                localStorage.removeItem("username")
                socket.emit('disconnectUser', leavingUser)
            }
        })))