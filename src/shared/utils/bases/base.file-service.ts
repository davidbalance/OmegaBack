import { ReadStream } from "fs";

export interface FileManagementService<K> {
    getFile(key: K): Promise<ReadStream>;
    getFilePath(key: K): string | Promise<string>;
    uploadFile(key: K, file: Express.Multer.File): string | Promise<string>;
    removeFile(key: K): boolean | Promise<boolean>;
}