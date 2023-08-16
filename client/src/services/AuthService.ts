import $api from "../http";
import {AxiosResponse} from "axios"
import {AuthResponse} from "../models/response/authResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/login", {email, password})
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/registration", {username, email, password})
    }

    static async logout(): Promise<any> {
        return $api.post<AuthResponse>("/logout")
    }
}