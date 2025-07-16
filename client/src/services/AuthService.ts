import $api from "../http";
import {AxiosResponse} from "axios"
import {AuthResponseModel} from "@/models/response/authResponse.model";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseModel>> {
        return $api.post<AuthResponseModel>("/login", {email, password})
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponseModel>> {
        return $api.post<AuthResponseModel>("/registration", {username, email, password})
    }

    static async logout(): Promise<any> {
        return $api.post<AuthResponseModel>("/logout")
    }
}