
export interface PdfProvider {
    craft(data: unknown): Promise<Buffer>;
}