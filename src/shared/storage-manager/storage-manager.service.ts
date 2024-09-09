import { StreamableFile } from "@nestjs/common";
import { ReadStream } from "fs";

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
    abstract readFile(dir: string): ReadStream | Promise<ReadStream>;

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
     * @param dir 
     */
    abstract deleteFile(dir: string): boolean | Promise<boolean>;
}


export const INJECT_STORAGE_MANAGER = typeof StorageManager;