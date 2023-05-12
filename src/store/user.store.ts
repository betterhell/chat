import {create} from "zustand";
import {devtools} from "zustand/middleware";
import axios from "axios";

interface UserStoreState {
    userId: string,
    userToken: string,
    userStatus: number,
    isLoading: boolean,
    setUserId: (userId: string) => void,
    setUserToken: (userToken: string) => void,
    checkUser: () => void
}

export const useUserStore = create<UserStoreState>()(devtools((set, get) => ({
    userId: "",
    userToken: "",
    isLoading: false,

    userStatus: 200,

    setUserId: (userId) => {
        set(({userId: userId}))
    },

    setUserToken: (userToken) => {
        set(({userToken: userToken}))
    },

    checkUser: async () => {
        const apiUrl = `https://api.green-api.com`

        set(({isLoading: true}))
        try {
            const response = await axios.get(`${apiUrl}/waInstance${get().userId}/getStateInstance/${get().userToken}`)

            if (response.status === 200) {
                set(({userStatus: response.status}))
                set(({isLoading: false}))
            }
        } catch (error: any) {
            set(({userStatus: error?.response.status}))
            set(({isLoading: false}))
        }

    }
})))