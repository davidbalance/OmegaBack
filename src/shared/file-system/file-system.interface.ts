export interface DirectorySystem {
    existsDir(dir: string): Promise<boolean>;
    mkdir(dir: string): Promise<void>;
    rmDir(dir: string): Promise<void>;
}

export type FileSystemOptions = {
    filename?: string;
    extension: string;
}
export interface FileSystemOperation {
    read(path: string, options?: {
        encoding?: null | undefined;
        flag?: string | undefined;
    } | null): Promise<Buffer>;
    write(dir: string, data: string | Buffer | ArrayBuffer, options?: FileSystemOptions): Promise<string>;
    exists(path: string): Promise<boolean>;
    delete(path: string): Promise<void>;
}

type FileSystemBase = FileSystemOperation & DirectorySystem
export interface IFileSystem extends FileSystemBase { }