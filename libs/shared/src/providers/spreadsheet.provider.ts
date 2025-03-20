export type SpreadsheetColumn<T extends object> = {
    header: string;
    key: keyof T;
}

export interface SpreadsheetProvider<T extends object> {
    craft(data: T[], columns: SpreadsheetColumn<T>[], worksheetName?: string): Promise<Buffer>;
    read(buffer: Buffer): Promise<any[]>;
}