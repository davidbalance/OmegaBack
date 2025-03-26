export type SpreadsheetColumn<T extends object> = {
    header: string;
    key: keyof T;
}

export type SpreadsheetCell = {
    value: string | number;
    position?: 'horizontal' | 'vertical'
    colSpan?: number;
    rowSpan?: number;
}

export type SpreadsheetWorkbook = SpreadsheetCell[][];

export interface SpreadsheetProvider<T extends object> {
    craft(data: T[], columns: SpreadsheetColumn<T>[], worksheetName?: string): Promise<Buffer>;
    newCraft(data: SpreadsheetWorkbook, worksheetName?: string): Promise<Buffer>;
    read(buffer: Buffer): Promise<any[]>;
}