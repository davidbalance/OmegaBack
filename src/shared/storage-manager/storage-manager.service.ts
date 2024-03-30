import { StreamableFile } from "@nestjs/common";

export abstract class StorageManager {
    abstract saveFile(buffered: Buffer, extension: string, destinationPath?: string): string | Promise<string>;
    abstract readFile(dir: string): StreamableFile | Promise<StreamableFile>;
    abstract replaceFile(): Promise<boolean>;
    abstract moveFile(): Promise<boolean>;
    abstract deleteFile(): Promise<boolean>;
}