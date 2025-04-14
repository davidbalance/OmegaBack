export type SpreadsheetCell = {
    value: string | number;
    position?: 'horizontal' | 'vertical'
    colSpan?: number;
    rowSpan?: number;
    font?: Partial<{ bold: boolean; color: string, size: number }>
    highlight?: string;
}

export type SpreadsheetWorkbook = SpreadsheetCell[][];

export interface SpreadsheetProvider {
    craft(data: SpreadsheetWorkbook, worksheetName?: string): Promise<Buffer>;
    read(buffer: Buffer): Promise<any[]>;
}