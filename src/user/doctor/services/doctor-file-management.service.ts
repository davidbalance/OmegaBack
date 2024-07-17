import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from '../doctor.repository';
import { signaturePath } from '@/shared';
import path, { extname } from 'path';
import { INJECT_STORAGE_MANAGER, StorageManager } from '@/shared/storage-manager';

@Injectable()
export class DoctorFileManagementService {

    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(INJECT_STORAGE_MANAGER) private readonly storage: StorageManager
    ) { }

    async uploadFile(id: number, signature: Express.Multer.File): Promise<void> {
        const doctor = await this.repository.findOne({
            where: { id },
            select: {
                user: { dni: true }
            }
        });
        const directory = doctor.user.dni;
        const extension = extname(signature.originalname);
        await this.storage.saveFile(
            signature.buffer, 
            extension,
            path.resolve(signaturePath({ dni: directory })),
            doctor.user.dni
        );
        await this.repository.findOneAndUpdate({ id }, { hasFile: true });
    }
}
