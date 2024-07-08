import { Inject, Injectable } from '@nestjs/common';
import path, { extname } from 'path';
import { StorageManager } from '@/shared/storage-manager';
import { signaturePath } from '@/shared';
import { DoctorRepository } from '../doctor.repository';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(StorageManager) private readonly storage: StorageManager
  ) { }

  /**
   * Encuentra todos los medicos activos del sistema.
   * @returns 
   */
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
          lastname: true,
          hasCredential: true
        }
      },
      cache: 1000 * 900
    });
    return doctors;
  }

  /**
   * Encuentra un medico por su identificador unico.
   * @param id 
   * @returns 
   */
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

  /**
   * Encuentra un medico por su dni.
   * @param dni 
   * @returns 
   */
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

  /**
   * Carga una imagen como firma del medico.
   * @param id 
   * @param signature 
   */
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
