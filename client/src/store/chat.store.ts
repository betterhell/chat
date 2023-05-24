import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import React, {useEffect} from "react";
import {v4 as uuidv4} from "uuid";

import {io} from "socket.io-client"
import {User, Users} from "../models/user.model";
import {Message, Messages} from "../models/message.model";

const socket = io("http://localhost:5000")

interface chatStoreState {
    users: []
    message: string
    messages: []
    handleMessage: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSendMessage: (e: React.ChangeEvent<HTMLFormElement>) => void
    handleNewMessage: () => void
    handleNewUser: () => void
    handleDisconnectUser: () => void
}

export const useChatStore = create<chatStoreState>()(
    devtools(
        persist(
            (set, get) => ({
                users: [],
                message: "",
                messages: [],

                handleMessage: (e) => {
                    set({message: e.target.value})
                },

                handleSendMessage: (e: React.ChangeEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    if (get().message.trim() && localStorage.getItem("username")) {
                        socket.emit("message", {
                            id: uuidv4(),
                            socketId: socket.id,
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

                handleNewUser: () => {
                    socket.on('connectNewUser', (data: any) => set({users: data}))
                },

                handleDisconnectUser: () => {
                    socket.on('disconnected', (data: any) => set({users: data}))
                },
            }), {name: "chat-store"})))