import { registerAs } from "@nestjs/config";

export const OrderHelperName: string = 'OrderHelperName';

export interface OrderHelper {
    redirectUrl: string;
    logoPath: string;
    templatePath: string;

}

export default registerAs(OrderHelperName, (): OrderHelper => ({
    redirectUrl: process.env.REDIRECT_URL_EMAIL || '',
    logoPath: process.env.LOGO_PATH || '',
    templatePath: process.env.CHECKLIST_TEMPLATE_PATH || '',
}))