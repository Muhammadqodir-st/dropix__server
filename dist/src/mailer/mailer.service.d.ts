export declare class MailerService {
    private transporter;
    private logger;
    constructor();
    sendEmail(to: string, html: string, subject?: string): Promise<{
        success: boolean;
        messageId: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        messageId?: undefined;
    }>;
}
