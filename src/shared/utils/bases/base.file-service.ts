import { StreamableFile } from "@nestjs/common";

export interface FileManagementService<K> {
    getFile(key: K): Promise<StreamableFile>;
    getFilePath(key: K): string | Promise<string>;
    uploadFile(key: K, file: Express.Multer.File): string | Promise<string>;
    removeFile(key: K): boolean | Promise<boolean>;
}