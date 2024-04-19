import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';
import path, { extname } from 'path';
import { StorageManager } from '@/shared/storage-manager';
import { signaturePath } from '@/shared';

@Injectable()
export class DoctorService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(StorageManager) private readonly storage: StorageManager
  ) { }

  async find(): Promise<Doctor[]> {
    const doctors = await this.repository.find({
      select: {
        id: true,
        signature: true,
        user: {
          id: true,
          dni: true,
          email: true,
          name: true,
          lastname: true
        }
      }
    });
    return doctors;
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.repository.findOne({
      where: {
        id: id
      },
      select: {
        id: true,
        signature: true,
        user: {
          id: true,
          dni: true,
          email: true,
          name: true,
          lastname: true
        }
      }
    });
    return doctor;
  }

  async findOneByDni(dni: string): Promise<Doctor> {
    const doctor = await this.repository.findOne({
      where: {
        user: {
          dni: dni
        }
      },
      select: {
        id: true,
        signature: true,
        user: {
          id: true,
          dni: true,
          email: true,
          name: true,
          lastname: true
        }
      }
    });
    return doctor;
  }



  async uploadSignature(id: number, signature: Express.Multer.File): Promise<void> {
    const doctor = await this.repository.findOne({
      where: { id },
      select: {
        user: {
          dni: true
        }
      }
    });
    const directory = doctor.user.dni;
    const extension = extname(signature.originalname);
    const uploaded = await this.storage.saveFile(signature.buffer, extension, path.resolve(signaturePath({ dni: directory })), doctor.user.dni);
    await this.repository.findOneAndUpdate({ id }, { signature: `${directory}/${uploaded}` });
  }
}
