import {create} from "zustand";
import {devtools} from "zustand/middleware";

interface UserStoreState {

}

export const useUserStore = create<UserStoreState>()(devtools((set, get) => ({})))