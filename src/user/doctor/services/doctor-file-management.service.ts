import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { signaturePath } from '@/shared/utils';
import { FILE_SYSTEM } from '@/shared/file-system/inject-token';
import { IFileSystem } from '@/shared/file-system/file-system.interface';
import { NEST_PATH } from '@/shared/nest-ext/path/inject-token';
import { Path } from '@/shared/nest-ext/path/path.type';
import { ReadStream } from 'fs';
import { Readable } from 'stream';

@Injectable()
export class DoctorFileManagementService {

    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(FILE_SYSTEM) private readonly fileSystem: IFileSystem,
        @Inject(NEST_PATH) private readonly path: Path
    ) { }

    async findFile(id: number): Promise<Buffer> {
        const doctor = await this.repository.findOne({ where: { id: id } });
        const filepath: string = signaturePath({ dni: doctor.user.dni });
        const directoryImage: string = this.path.join(filepath, `${doctor.user.dni}.png`);
        return this.fileSystem.read(directoryImage);
    }

    async uploadFile(id: number, signature: Express.Multer.File): Promise<void> {
        const doctor = await this.repository.findOne({
            where: { id },
            select: {
                user: { dni: true }
            }
        });
        const directory = doctor.user.dni;
        const extension = this.path.extname(signature.originalname);
        const filepath = this.path.resolve(signaturePath({ dni: directory }));
        await this.fileSystem.write(filepath, signature.buffer, { extension: extension, filename: doctor.user.dni });
        await this.repository.findOneAndUpdate({ id }, { hasFile: true });
    }
}
