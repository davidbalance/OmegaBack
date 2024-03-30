import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';
import { UserService } from 'src/user/user/user.service';
import path, { extname } from 'path';
import { CreateDoctorRequestDTO, FindDoctor, FindOneDoctorAndUpdateRequestDTO } from '../common';
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

  async find(): Promise<FindDoctor[]> {
    const doctors = await this.repository.find({
      where: {
        user: {
          status: true
        }
      },
      select: {
        id: true,
        signature: true,
        user: {
          dni: true,
          email: true,
          name: true,
          lastname: true
        }
      }
    });
    const foundDoctors = doctors.map((e) => {
      const user = e.user;
      delete user.createAt;
      delete user.updateAt;
      delete user.id;
      delete user.hasCredential;
      delete user.status;
      delete e.user;
      return { ...e, ...user };
    });
    return foundDoctors;
  }

  async findOne(id: number): Promise<FindDoctor> {
    const doctor = await this.repository.findOne({
      where: {
        id: id
      },
      select: {
        id: true,
        signature: true,
        user: {
          dni: true,
          email: true,
          name: true,
          lastname: true
        }
      }
    });
    const user = doctor.user;
    delete user.createAt;
    delete user.updateAt;
    delete user.id;
    delete user.hasCredential;
    delete user.status;
    delete doctor.user;
    return { ...doctor, ...user };
  }

  async findOneAndUpdate(id: number, { ...data }: FindOneDoctorAndUpdateRequestDTO): Promise<FindDoctor> {
    const doctor = await this.repository.findOne({
      where: { id },
      select: {
        user: {
          id: true
        }
      }
    });
    const user = await this.userService.findOneAndUpdate(doctor.user.id, data);
    const foundDoctor = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        signature: true,
        user: {
          dni: true,
          email: true,
          name: true,
          lastname: true,
        }
      }
    })
    return { ...foundDoctor, ...foundDoctor.user };
  }

  async uploadSignature(id: number, signature: Express.Multer.File): Promise<void> {
    const doctor = await this.repository.findOne({ where: { id }, select: { user: { dni: true } } });
    const directory = doctor.user.dni;
    const extension = extname(signature.filename);
    const uploaded = await this.storage.saveFile(signature.buffer, extension, path.resolve(`signatures/${directory}`));
    await this.repository.findOneAndUpdate({ id }, { signature: `${directory}/${uploaded}` });
  }
}
