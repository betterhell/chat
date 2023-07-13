import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import AuthService from "../services/AuthService";
import { User } from "../models/user.model";
import { AuthResponse } from "../models/response/authResponse";
import { API_URL } from "../http";
import UserService from "../services/UserService";
import socket from "../socket";

interface useUserStore {
  user: User | null;
  foundUser: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isError: string;
  registration: (username: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  update: (username: string, avatar: any) => void;
  checkAuth: () => void;
  findUser: (username: string) => void;
  addToFriends: (user: User) => void;
}

export const useUserStore = create<useUserStore>()(
  devtools((set, get) => ({
    user: null,
    foundUser: null,
    isAuth: false,
    isLoading: false,
    isError: "",

    registration: async (username, email, password) => {
      set({ isLoading: true });

      try {
        const { data } = await AuthService.registration(
          username,
          email,
          password
        );

        localStorage.setItem("token", data.accessToken);
        set({ isAuth: true });
        set({ user: data.user });
        set({ isLoading: false });
        socket.emit("user:connectingAlert", data.user.username);
      } catch (error: any) {
        set({ isError: "User already exist or incorrect credentials" });
        set({ isLoading: false });
      }
    },

    login: async (email, password) => {
      set({ isLoading: true });
      try {
        const { data } = await AuthService.login(email, password);
        localStorage.setItem("token", data.accessToken);
        set({ user: data.user });
        set({ isLoading: false });
        set({ isAuth: true });
        socket.emit("user:connectingAlert", data.user.username);
      } catch (error: any) {
        set({ isError: "User does not exist!" });
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await AuthService.logout();
        localStorage.removeItem("token");
        set({ isAuth: false });
        set({ isLoading: false });
        socket.emit("user:disconnectingAlert", get().user?.username);
        socket.emit("user:disconnect", get().user);
        set({ user: null });
      } catch (error: any) {
        set({ isError: error.response?.data?.message, isLoading: false });
      }
    },

    update: async (username, avatar) => {
      set({ isLoading: true });
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("username", username);

        await axios.post(
          `${API_URL}/user/update/${get().user?._id}`,
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          }
        );
        set({ isLoading: false });
      } catch (error: any) {
        set({ isError: error.response?.data?.message });
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const { data } = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", data.accessToken);
        set({ isAuth: true });
        set({ user: data.user });
        set({ isLoading: false });
      } catch (error: any) {
        set({ isError: error.response?.data?.message });
      }
    },

    findUser: async (username) => {
      set({ isLoading: true });
      set({ foundUser: null });
      try {
        const { data } = await UserService.fetchUser(username);
        set({ foundUser: data });
        set({ isLoading: false });
      } catch (error: any) {
        set({ isError: "User does not exist!", isLoading: false });
      }
    },

    addToFriends: async (user) => {
      set({ isLoading: true });
      try {
        const { data } = await UserService.addToFriend(user);

        if (!data) {
          throw new Error("User already in friends!");
        }

        set({ isLoading: false });
      } catch (error: any) {
        console.log(error);
        set({ isError: error, isLoading: false });
      }
    },
  }))
);
