export interface Message {
    id: string,
    socketId: string,
    username: string,
    text: string,
    timestamp: string,
}

export interface Messages {
    messages: Message[]
}