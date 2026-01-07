import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'

@Injectable()
export class MailerService {
    private transporter: Transporter
    private logger = new Logger(MailerService.name)

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    };

    async sendEmail(to: string, html: string, subject = 'Welcome to DROPIX') {
        try {
            const info = await this.transporter.sendMail({
                from: `"DROPIX" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html
            });

            this.logger.log(`Email sent :${info.messageId}`)
            return { success: true, messageId: info.messageId }
        } catch (error) {
            this.logger.log(`Email send failed:${error.message}`)
            return { success: false, error: error.message }
        }
    }
}
