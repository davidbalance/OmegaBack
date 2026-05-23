import { registerAs } from "@nestjs/config";

export const RedirectUrlEmailName: string = 'RedirectUrlEmailName';

export interface RedirectUrlEmail {
    redirect_url: string;
}

export default registerAs(RedirectUrlEmailName, (): RedirectUrlEmail => ({
    redirect_url: process.env.REDIRECT_URL_EMAIL || '',
}))