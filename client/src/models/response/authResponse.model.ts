import {User} from "../user.model";

export interface AuthResponseModel {
    accessToken: string,
    refreshToken: string,
    user: User
}