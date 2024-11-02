import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { INJECT_STORAGE_MANAGER, StorageManager } from '@/shared/storage-manager';
import { signaturePath } from '@/shared/utils';
import { ReadStream } from 'fs';
import { NEST_PATH } from '@/shared/nest-ext/nest-path/inject-token';
import { NestPath } from '@/shared/nest-ext/nest-path/nest-path.type';

@Injectable()
export class DoctorFileManagementService {

    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager,
        @Inject(NEST_PATH) private readonly path: NestPath
    ) { }

    async findFile(id: number): Promise<ReadStream> {
        const doctor = await this.repository.findOne({ where: { id: id } });
        const filepath: string = signaturePath({ dni: doctor.user.dni });
        const directoryImage: string = this.path.join(filepath, `${doctor.user.dni}.png`);
        return this.storage.readFile(directoryImage);
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
        await this.storage.saveFile(
            signature.buffer,
            extension,
            this.path.resolve(signaturePath({ dni: directory })),
            doctor.user.dni
        );
        await this.repository.findOneAndUpdate({ id }, { hasFile: true });
    }
}
