import { NotFoundError } from "../domain/error";

export interface FileOperation {
    write(filepath: string, filename: string, buffer: Buffer | ArrayBuffer): Promise<string>;
    read(filepath: string): Promise<Buffer>;
    remove(filepath: string): Promise<void>;
}

export class FileNotFoundError extends NotFoundError {
    constructor(filepath: string) {
        super(`File: ${filepath} not exists.`);
    }
}