import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import puppeteer, { PDFOptions } from 'puppeteer-core';

@Injectable()
export class PdfManagerService {

    /**
     * Creates a pdf using a handlebars template
     * @param templatePath 
     * @param data 
     * @param options 
     * @returns {Promise<Buffer>}
     */
    async craft(templatePath: string, data: any, options?: PDFOptions): Promise<Buffer> {
        try {
            // const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
            const browser = await puppeteer.launch({
                headless: true,
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                ],
                timeout: 60000,
                dumpio: true
            });
            const page = await browser.newPage();

            const html = readFileSync(templatePath, 'utf-8');
            const compile = handlebars.compile(html)
            const content = compile(data);
            // await page.setContent(content);
            await page.setContent(content, { waitUntil: 'networkidle0', timeout: 60000 });

            const buffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    left: '10mm',
                    right: '10mm',
                    top: '10mm',
                    bottom: '10mm',
                },
                ...options
            });

            await browser.close();
            return buffer;
        } catch (error) {
            throw error;
        }
    }
}