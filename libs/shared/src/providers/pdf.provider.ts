
export interface PdfProvider {
    craft(data: unknown, template: string): Promise<Buffer>;
}