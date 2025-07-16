import $api from "../http";
import {AxiosResponse} from "axios"
import {MessageResponseModel} from "@/models/response/messageResponse.model";
import {Message} from "@/models/message.model";

export default class MessageService {
    static async createMessage(text: string): Promise<AxiosResponse<MessageResponseModel>> {
        return $api.post<MessageResponseModel>("/message", {text})
    }

    static async getMessages(): Promise<AxiosResponse<Message[]>> {
        return $api.get<Message[]>("/messages")
    }
}