import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import AuthService from "@/services/AuthService";
import { User } from "@/models/user.model";
import { AuthResponseModel } from "@/models/response/authResponse.model";
import { API_URL } from "@/config";
import UserService from "@/services/UserService";
import socket from "@/socket";

interface useUserStore {
  user: User | null;
  foundUser: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isError: string;
  registration: (username: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  update: (username: string, avatar: File) => void;
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
      } catch (error: unknown) {
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
      } catch (error: unknown) {
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
      } catch (error: unknown) {
        set({ isError: (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) ? (error.response as any).data.message : undefined, isLoading: false });
      }
    },

    update: async (username, avatar) => {
      set({ isLoading: true });
      set({ isError: "" });
      
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("username", username);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/user/update/${get().user?._id}`,
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        
        const updatedUser = response.data;
        
        set((state) => ({ 
          ...state, 
          user: updatedUser,
          isLoading: false, 
          isError: "" 
        }));
        
        socket.emit("user:updateProfile", updatedUser);
      } catch (error: unknown) {
        console.error("Update error:", error);
        let errorMessage = "Failed to update profile";
        if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
          errorMessage = (error.response as any).data.message;
        }
        set({ isError: errorMessage, isLoading: false });
        throw error;
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const { data } = await axios.get<AuthResponseModel>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", data.accessToken);
        set({ isAuth: true });
        set({ user: data.user });
        set({ isLoading: false });
      } catch (error: unknown) {
        set({ isError: (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) ? (error.response as any).data.message : undefined });
      }
    },

    findUser: async (username) => {
      set({ isLoading: true });
      set({ foundUser: null });
      try {
        const { data } = await UserService.fetchUser(username);
        set({ foundUser: data });
        set({ isLoading: false });
      } catch (error: unknown) {
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
      } catch (error: unknown) {
        console.log(error);
        set({ isError: error instanceof Error ? error.message : String(error), isLoading: false });
      }
    },
  }))
);
