import { Injectable, Logger, Provider } from '@nestjs/common';
import { InternalError } from '@shared/shared/domain/error';
import { SpreadSheetProviderToken } from '@shared/shared/nest/inject';
import { SpreadsheetColumn, SpreadsheetProvider } from '@shared/shared/providers';
import { Column, Workbook } from 'exceljs';

@Injectable()
export class LocalSpreadsheetService<T extends object> implements SpreadsheetProvider<T> {

    async craft(data: T[], columns: SpreadsheetColumn<T>[], worksheetName: string = 'Book1'): Promise<Buffer> {
        try {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet(worksheetName);
            worksheet.columns = columns.map<Partial<Column>>((e) => ({
                header: e.header,
                key: e.key
            } as Partial<Column>));
            worksheet.addRows(data);

            const buffer = await workbook.xlsx.writeBuffer();
            return buffer as Buffer;
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Spreadsheet crafting error.');
        }
    }
}

export const LocalSpreadsheetProvider: Provider = {
    provide: SpreadSheetProviderToken,
    useClass: LocalSpreadsheetService
}
