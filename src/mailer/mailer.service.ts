import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
    private resend = new Resend(process.env.RESEND_API_KEY);
    private logger = new Logger(MailerService.name);

    async sendEmail(to: string, html: string, subject = 'Welcome to DROPIX') {
        try {
            const data = await this.resend.emails.send({
                from: 'DROPIX <onboarding@resend.dev>', // Keyinchalik o'z domeningizni ulasangiz bo'ladi
                to: [to],
                subject: subject,
                html: html,
            });

            this.logger.log(`Email sent successfully: ${data.data?.id}`);
            return { success: true };
        } catch (error:any) {
            this.logger.error(`Resend failed: ${error.message}`);
            return { success: false };
        }
    }
}
