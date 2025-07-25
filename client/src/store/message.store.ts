import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import MessageService from "../services/MessageService";
import { useUserStore } from "./user.store";
import { Message } from "../models/message.model";
import socket from "../socket";

interface messageStoreState {
  message: Message;
  messages: Message[] | [];
  setMessage: (message: string) => void;
  currentEmoji: string;
  isLoading: boolean;
  typingStatus: string;
  isError: string;

  createMessage: (message: Message) => void;
  handleNewMessage: (message: Message) => void;
  fetchMessages: () => void;
}

export const useMessageStore = create<messageStoreState>()(
  devtools((set, get) => ({
    message: {
      id: "",
      text: "",
      username: "",
      timestamp: "",
      userId: "",
    },
    messages: [],
    currentEmoji: "",
    isLoading: false,
    typingStatus: "",
    isError: "",

    setMessage: (message) => {
      set({ message: { text: message } });
    },

    createMessage: async (message) => {
      set({ isLoading: true });

      try {
        if (message.text.trim() && useUserStore.getState().user?.username) {
          socket.emit("message:createMessage", {
            _id: uuidv4(),
            username: useUserStore.getState().user?.username,
            text: message.text,
            timestamp: new Date().toLocaleTimeString("ru-RU", {
              timeStyle: "short",
            }),
            userId: useUserStore.getState().user?._id,
          });
          set({ message: { text: "" } });
        }

        const { data } = await MessageService.createMessage(message.text);
        set({ message: { text: data.text } });
        set({ message: { text: "" } });
        set({ isLoading: false });
      } catch (error: unknown) {
        set({ isError: (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) ? (error.response as any).data.message : undefined });
        set({ isLoading: false });
      }
    },

    handleNewMessage: (message) => {
      set({ messages: [...get().messages, message] });
    },

    fetchMessages: async () => {
      try {
        const { data } = await MessageService.getMessages();
        set({ messages: data });
      } catch (error: unknown) {
        console.log(error);
      }
    },
  }))
);
