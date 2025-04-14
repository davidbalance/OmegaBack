export type ZipPayload = {
    filename: string;
    buffer: Buffer;
}
export interface ZipProvider {
    zip(value: ZipPayload[]): Promise<Buffer>;
}