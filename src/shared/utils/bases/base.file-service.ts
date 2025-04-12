export interface FileManagementService<K> {
    getFilePath(key: K): string | Promise<string>;
    uploadFile(key: K, file: Express.Multer.File): string | Promise<string>;
    removeFile(key: K): boolean | Promise<boolean>;
}