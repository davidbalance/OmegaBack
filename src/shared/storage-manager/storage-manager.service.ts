import { StreamableFile } from "@nestjs/common";

export abstract class StorageManager {
    /**
     * Saves file in the designed storage
     * @param buffered 
     * @param extension 
     * @param destinationPath 
     * @param filename 
     */
    abstract saveFile(buffered: Buffer, extension: string, destinationPath?: string, filename?: string): string | Promise<string>;

    /**
     * Returns a file in the desire directory
     * @param dir 
     */
    abstract readFile(dir: string): StreamableFile | Promise<StreamableFile>;

    /**
     * Replace file
     */
    abstract replaceFile(): Promise<boolean>; 

    /**
     * Moves the file a another directory
     */
    abstract moveFile(): Promise<boolean>;

    /**
     * Deletes the file in a desire directory
     */
    abstract deleteFile(): Promise<boolean>;
}