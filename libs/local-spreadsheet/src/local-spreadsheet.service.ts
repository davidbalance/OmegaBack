import { Injectable, Logger, Provider } from '@nestjs/common';
import { InternalError } from '@shared/shared/domain/error';
import { SpreadSheetProviderToken } from '@shared/shared/nest/inject';
import { SpreadsheetCell, SpreadsheetColumn, SpreadsheetProvider, SpreadsheetWorkbook } from '@shared/shared/providers';
import { Column, Workbook } from 'exceljs';

@Injectable()
export class LocalSpreadsheetService<T extends object> implements SpreadsheetProvider<T> {

    async read(buffer: Buffer): Promise<any[]> {
        const workbook = new Workbook();
        const data: any[] = [];

        await workbook.xlsx.load(buffer);
        const worksheet = workbook.worksheets[0];

        worksheet.eachRow((row) => {
            const rowData = row.values;
            data.push(rowData);
        });

        return data;
    }

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

    async newCraft(data: SpreadsheetWorkbook, worksheetName?: string): Promise<Buffer> {
        const maxLength = data.reduce((prev, curr) => prev < curr.length ? curr.length : prev, -1);
        let nextSpan = Array.from<{ horizontal: number, vertical: number }>({ length: maxLength }).fill({ horizontal: 0, vertical: 0 });

        try {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet(worksheetName ?? 'Book1');

            data.forEach((row, index) => {
                const rowIndex = index + 1;
                const spreadsheetRow = worksheet.getRow(rowIndex);
                let spreadsheetCol = 1;

                console.log(nextSpan);
                for (let i = 0; i < nextSpan.length; i++) {
                    const spanColumn = nextSpan[i];

                    if (spanColumn.vertical !== 0) {
                        spreadsheetCol += spanColumn.horizontal > 0 ? spanColumn.horizontal - 1 : 0;
                        i += spanColumn.horizontal > 0 ? spanColumn.horizontal - 1 : 0;
                    } else {
                        const colLetter: string = worksheet.getColumn(spreadsheetCol).letter;
                        const cell = spreadsheetRow.getCell(spreadsheetCol);
                        const value = row[i];
                        if (value) {
                            cell.value = value.value;
                            cell.alignment = value.position === 'vertical' ? { ...cell.alignment, textRotation: 90 } : cell.alignment;
                            if (value.colSpan && value.rowSpan) {
                                const nextColumn = worksheet.getColumn(spreadsheetCol + value.colSpan).letter;
                                worksheet.mergeCells(`${colLetter}${rowIndex}:${nextColumn}${rowIndex + value.rowSpan - 1}`);
                            } else if (value.colSpan) {
                                const nextColumn = worksheet.getColumn(spreadsheetCol + value.colSpan).letter;
                                worksheet.mergeCells(`${colLetter}${rowIndex}:${nextColumn}${rowIndex}`);
                            } else if (value.rowSpan) {
                                worksheet.mergeCells(`${colLetter}${rowIndex}:${colLetter}${rowIndex + value.rowSpan - 1}`);
                            }

                            if (value.rowSpan && value.rowSpan > 1) {
                                nextSpan[i] = { horizontal: value.colSpan ?? 0, vertical: value.rowSpan ?? 0 }
                            }
                            spreadsheetCol += (value.colSpan ?? 0);
                            i += (value.colSpan ?? 0);
                        }
                    }
                    console.log(`SpreadSheetCol=${spreadsheetCol}, index=${i}, value=${row[i]?.value ?? 'N/A'}`)
                    spreadsheetCol++;
                }
                nextSpan = nextSpan.map(e => e.vertical > 1 ? ({ ...e, vertical: e.vertical - 1 }) : { vertical: 0, horizontal: 0 });
            });

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
