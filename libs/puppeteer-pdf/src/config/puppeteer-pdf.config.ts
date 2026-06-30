import { registerAs } from "@nestjs/config";

export const PuppeteerPdfConfigName: string = 'PuppeteerPdfConfigName';

export interface PuppeteerPdfConfig {
    chromium_path: string
}

export default registerAs(PuppeteerPdfConfigName, (): PuppeteerPdfConfig => ({
    chromium_path: process.env.CHROMIUM_PATH || '',
}))