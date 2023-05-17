import {create} from "zustand";
import {devtools} from "zustand/middleware";
import axios from "axios";

interface UserStoreState {
    userId: string,
    userToken: string,
    userStatus: number,
    isLoading: boolean,
    idMessage: string
    setUserId: (userId: string) => void
    setUserToken: (userToken: string) => void
    checkUser: () => void
    createNewMessage: (userPhone: string, userMessage: string) => void
}

export const useUserStore = create<UserStoreState>()(devtools((set, get) => ({
    userId: "",
    userToken: "",
    isLoading: false,
    idMessage: "",
    userStatus: 200,

    setUserId: (userId) => {
        set({userId: userId})
    },

    setUserToken: (userToken) => {
        set({userToken: userToken})
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
            set(({userStatus: error?.response?.status}))
            set(({isLoading: false}))
        }
    },

    createNewMessage: async (userPhone, userMessage) => {
        const apiUrl = `https://api.green-api.com`

        set(({isLoading: true}))

        const options = {
            chatId: `${userPhone}@c.us`,
            message: userMessage,
        }

        try {
            const response = await axios.post(`https://api.green-api.com/waInstance1101818784/SendMessage/45ad66a2618441e28ea6fa7db8b4a441b28694bada96459fab`, {
                chatId: `${userPhone}@c.us`,
                message: `${userMessage}`,
            })
            console.log(response)
        } catch (error: any) {
            console.log(error)
        }
    },

})))