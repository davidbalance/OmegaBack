import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { PdfProviderToken } from '@shared/shared/nest/inject';
import PdfPrinter from "pdfmake"
import { PdfToken } from './local-pdf.dependencies';
import { PdfProvider } from '@shared/shared/providers/pdf.provider';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { InternalError } from '@shared/shared/domain/error';

@Injectable()
export class LocalPdfService implements PdfProvider {
    constructor(
        @Inject(PdfToken) private readonly pdf: PdfPrinter
    ) { }

    async craft(data: unknown): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            const doc = this.pdf.createPdfKitDocument(data as TDocumentDefinitions);
            const chunks: Buffer[] = [];

            doc.on('data', (chunk: Buffer) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', (err) => {
                Logger.error(err);
                reject(new InternalError('Error while crafitng the pdf.'))
            });
            doc.end();
        });
    }
}

export const LocalPdfProvider: Provider = {
    provide: PdfProviderToken,
    useClass: LocalPdfService
}
