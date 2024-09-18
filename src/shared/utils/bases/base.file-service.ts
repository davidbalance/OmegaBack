import { ReadStream } from "fs";

export interface GenericFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
}
export interface FileManagementService<K> {
    getFile(key: K): Promise<ReadStream>;
    getFilePath(key: K): string | Promise<string>;
    uploadFile(key: K, file: GenericFile): string | Promise<string>;
    removeFile(key: K): boolean | Promise<boolean>;
}