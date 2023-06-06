export interface User {
    username: string
    email: string,
    password: string,
    isActivatedEmail: boolean,
    activationLink: string
    id: string,
    birtDate: {
        day: string,
        month: string,
        year: string
    }
}
