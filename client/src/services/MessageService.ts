import $api from "../http";
import {AxiosResponse} from "axios"
import {MessageResponse} from "../models/response/messageResponse";
import {Message} from "../models/message.model";

export default class MessageService {
    static async createMessage(text: string): Promise<AxiosResponse<MessageResponse>> {
        return $api.post<MessageResponse>("/message", {text})
    }

    static async getMessages(): Promise<AxiosResponse<Message[]>> {
        return $api.get<Message[]>("/messages")
    }
}