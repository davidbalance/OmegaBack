import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { FileSystemOptions, IFileSystem } from "../file-system.interface";
import { NEST_PATH } from "@/shared/nest-ext/path/inject-token";
import { Path } from "@/shared/nest-ext/path/path.type";
import { NEST_UUID } from "@/shared/nest-ext/uuid/inject-token";
import { Uuid } from "@/shared/nest-ext/uuid/uuid.type";
import { NEST_FS } from "@/shared/nest-ext/fs/inject-token";
import { FS } from "@/shared/nest-ext/fs/fs.type";

@Injectable()
export class LocalFileSystemService implements IFileSystem {
    constructor(
        @Inject(NEST_FS) private readonly fs: FS,
        @Inject(NEST_UUID) private readonly uuid: Uuid,
        @Inject(NEST_PATH) private readonly path: Path,
    ) { }

    read(path: string): Promise<Buffer> {
        const filepath = this.path.resolve(path);
        if (!this.fs.existsSync(filepath)) {
            Logger.error(`File not found ${path}`);
            throw new NotFoundException(`File not found: ${path}`);
        }
        try {
            const buffer = this.fs.readFileSync(path);
            return new Promise((resolve) => resolve(buffer));
        } catch (error) {
            Logger.error(error);
            throw new InternalServerErrorException('An error occur reading the file');
        }
    }

    write(dir: string, data: Buffer, options: FileSystemOptions): Promise<string> {
        const { extension, filename = this.uuid.v4() } = options;
        const outputDir = this.path.resolve(dir);

        if (!this.fs.existsSync(outputDir)) {
            this.fs.mkdirSync(outputDir, { recursive: true });
        }

        const output = this.path.join(outputDir, `${filename}${extension}`);

        return new Promise((resolve, reject) => {
            const writeStream = this.fs.createWriteStream(output);
            writeStream.on('error', (err) => {
                reject(err);
            });
            writeStream.write(data);
            writeStream.end();
            resolve(output);
        });
    }

    exists(path: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.fs.existsSync(path));
        });
    }

    delete(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const filepath = this.path.resolve(path);
            if (!this.fs.existsSync(filepath)) {
                Logger.error(`File not found: ${path}`);
                reject(new NotFoundException(`File not found: ${path}`));
            }
            try {
                this.fs.unlinkSync(filepath);
                resolve();
            } catch (error) {
                Logger.error(error);
                reject(new InternalServerErrorException(`An error occur while deleting the file ${path}`));
            }
        });
    }

    existsDir(dir: string): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(this.fs.existsSync(dir));
        });
    }

    mkdir(dir: string): Promise<void> {
        return new Promise((resolve) => {
            try {
                this.fs.mkdirSync(dir, { recursive: true });
                resolve();
            } catch (error) {
                Logger.error(error);
                throw new InternalServerErrorException(`An error occur while creating the directory ${dir}`);
            }
        });
    }

    rmDir(dir: string): Promise<void> {
        return new Promise((resolve) => {
            try {
                this.fs.rmdirSync(dir, { recursive: true });
                resolve();
            } catch (error) {
                Logger.error(error);
                resolve();
            }
        });
    }
}