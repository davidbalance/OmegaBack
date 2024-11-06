export interface GenericFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
}
export interface IFileManagement<K> {
    getFile(key: K): Promise<Buffer>;
    getFilePath(key: K): string | Promise<string>;
    uploadFile(key: K, file: GenericFile): string | Promise<string>;
    removeFile(key: K): boolean | Promise<boolean>;
}