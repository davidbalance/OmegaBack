import { Injectable, StreamableFile } from '@nestjs/common';
import { Column, Workbook } from 'exceljs';
import { PassThrough } from 'stream';

@Injectable()
export class ExcelManagerService {
    async craft(
        data: any[],
        columns: Column[],
        worksheetName: string = 'book 1'): Promise<StreamableFile> {

        const workbook: Workbook = new Workbook();
        const worksheet = workbook.addWorksheet(worksheetName);
        worksheet.columns = columns;
        worksheet.addRows(data);

        const stream = new PassThrough();
        await workbook.xlsx.write(stream);
        return new StreamableFile(stream);
    }
}