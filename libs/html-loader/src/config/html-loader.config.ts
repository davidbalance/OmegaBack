import { registerAs } from "@nestjs/config";

export const HtmlLoaderConfigName: string = 'HtmlLoaderConfigName';

export interface HtmlLoaderConfig {
    template_path: string;
}

export default registerAs(HtmlLoaderConfigName, (): HtmlLoaderConfig => ({
    template_path: process.env.HTML_TEMPLATE_PATH || '',
}))