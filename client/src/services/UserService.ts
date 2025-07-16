import $api from "@/http";
import {AxiosResponse} from "axios"
import {User} from "@/models/user.model";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>("/users")
    }

    static async fetchUser(username: string): Promise<AxiosResponse<User>> {
        return $api.post<User>(`/user/${username}`)
    }

    static async addToFriend(user: User): Promise<AxiosResponse<User>> {
        return $api.patch<User>(`/user/${user.username}`)
    }
}