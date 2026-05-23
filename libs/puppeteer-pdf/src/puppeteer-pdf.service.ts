import { Injectable, Logger, OnApplicationShutdown, Provider } from '@nestjs/common';
import { InternalError } from '@shared/shared/domain/error';
import { PdfProviderToken } from '@shared/shared/nest/inject';
import { PdfProvider } from '@shared/shared/providers/pdf.provider';
import puppeteer, { Browser } from 'puppeteer';
import * as Handlebars from 'handlebars';

@Injectable()
export class PuppeteerPdfService implements PdfProvider, OnApplicationShutdown {

    private browser: Browser | null = null;

    async onApplicationShutdown(signal?: string) {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    async craft(data: unknown, template: string): Promise<Buffer> {
        const browser = await this.getBrowser();
        const html = this.renderTemplate(template, data);
        const page = await browser.newPage();

        try {
            await page.setContent(html, {
                waitUntil: "networkidle0"
            });

            const pdf = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "10mm",
                    right: "10mm",
                    bottom: "10mm",
                    left: "10mm"
                }
            });

            return Buffer.from(pdf);

        } catch (err) {
            Logger.error(err);
            throw new InternalError('Error while crafitng the pdf.')
        } finally {
            await page.close();
        }
    }

    private async getBrowser(): Promise<Browser> {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                executablePath: process.env.CHROMIUM_PATH,
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox"
                ]
            });
        }

        return this.browser;
    }

    private renderTemplate(template: string, data: unknown): string {
        const compiled = Handlebars.compile(template);
        return compiled(data);
    }

}

export const PuppeteerPdfProvider: Provider = {
    provide: PdfProviderToken,
    useClass: PuppeteerPdfService
}
