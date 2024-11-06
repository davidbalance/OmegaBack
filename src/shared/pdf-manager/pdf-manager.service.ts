import { Inject, Injectable } from '@nestjs/common';
import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom'
import PdfPrinter from 'pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Path } from '../nest-ext/path/path.type';
import { NEST_PATH } from '../nest-ext/path/inject-token';

@Injectable()
export class PdfManagerService {
    private printer: PdfPrinter;

    constructor(
        @Inject(NEST_PATH) path: Path
    ) {
        this.printer = new PdfPrinter({
            Roboto: {
                normal: path.join(path.resolve('static'), 'fonts/roboto', 'Roboto-Regular.ttf'),
                bold: path.join(path.resolve('static'), 'fonts/roboto', 'Roboto-Medium.ttf'),
                italics: path.join(path.resolve('static'), 'fonts/roboto', 'Roboto-Italic.ttf'),
                bolditalics: path.join(path.resolve('static'), 'fonts/roboto', 'Roboto-BoldItalic.ttf')
            },
        });
    }

    async craft(content: TDocumentDefinitions): Promise<Buffer> {

        return new Promise((resolve, reject) => {
            const doc = this.printer.createPdfKitDocument(content);
            const chunks: Buffer[] = [];

            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            doc.end();
        })
    }

    parseHtml(content: string): Content {
        const doc = htmlToPdfmake(content, new JSDOM());
        return doc;
    }
}