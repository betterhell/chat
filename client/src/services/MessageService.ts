import $api from "../http";
import {AxiosResponse} from "axios"
import {MessageResponse} from "../models/response/messageResponse";

export default class MessageService {
    static async createMessage(message: string): Promise<AxiosResponse<MessageResponse>> {
        return $api.post<MessageResponse>("/message", {message})
    }

}