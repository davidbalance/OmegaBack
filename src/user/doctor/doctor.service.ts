import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';
import { UserService } from 'src/user/user/user.service';
import path, { extname } from 'path';
import { CreateDoctorRequestDTO, FindOneDoctorAndUpdateRequestDTO } from '../common';
import { StorageManager } from '@/shared/storage-manager';

@Injectable()
export class DoctorService {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(StorageManager) private readonly storage: StorageManager
  ) { }

  async create({ ...data }: CreateDoctorRequestDTO): Promise<Doctor> {
    const user = await this.userService.create(data);
    const doctor = await this.repository.create({ user: user });
    return doctor;
  }

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

  async findOneAndUpdate(id: number, { ...data }: FindOneDoctorAndUpdateRequestDTO): Promise<Doctor> {
    const doctor = await this.repository.findOne({
      where: { id },
      select: {
        user: {
          id: true
        }
      }
    });
    const user = await this.userService.findOneAndUpdate(doctor.user.id, data);
    doctor.user = user;
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
    const extension = extname(signature.filename);
    const uploaded = await this.storage.saveFile(signature.buffer, extension, path.resolve(`signatures/${directory}`));
    await this.repository.findOneAndUpdate({ id }, { signature: `${directory}/${uploaded}` });
  }
}
