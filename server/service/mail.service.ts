const nodemailer = require("nodemailer")

class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.VITE_SMTP_HOST,
            port: Number(process.env.VITE_SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.VITE_SMTP_USER,
                pass: process.env.VITE_SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.VITE_SMTP_USER,
            to,
            subject: `Activate your account ${process.env.VITE_API_URL}`,
            text: "",
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href=${link}>${link}</a>
                </div>
                `
        })
    }
}

module.exports = new MailService()