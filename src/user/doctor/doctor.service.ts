import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorRequestDTO, FindOneOrCreateService, UpdateDoctorRequestDTO } from 'src/shared';
import { UserCredentialService } from 'src/authentication/user-credential/user-credential.service';
import { UserService } from 'src/user/user/user.service';
import { StorageSaver } from 'src/shared/storage-saver';
import path from 'path';

type FindDoctorParams = Omit<Doctor, 'id' | 'signature' | 'results' | 'user'> & { dni: string };

@Injectable()
export class DoctorService
  implements FindOneOrCreateService<Doctor> {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(UserCredentialService) private readonly credentialService: UserCredentialService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(StorageSaver) private readonly storage: StorageSaver
  ) { }

  async findOneOrCreate(filterOption: any, createOption: any): Promise<Doctor> {
    const doctorOptions = createOption as CreateDoctorRequestDTO;
    const filter = filterOption as Partial<FindDoctorParams & { id: number }>
    try {
      return await this.findOne(filter);
    } catch (error) {
      const user = await this.userService.create(doctorOptions);
      const patient = await this.repository.create({ ...doctorOptions, user: user });
      return patient;
    }
  }

  async create(createDoctor: CreateDoctorRequestDTO): Promise<Doctor> {
    const user = await this.userService.create(createDoctor);
    await this.credentialService.create(createDoctor, user.id);
    return await this.repository.create({ ...createDoctor, user: user });
  }

  async find(params?: Partial<FindDoctorParams>): Promise<Doctor[]> {
    return await this.repository.find({ ...params, user: { dni: params.dni, status: true } }, { user: true });
  }

  async findOne(params?: Partial<FindDoctorParams & { id: number }>): Promise<Doctor> {
    return await this.repository.findOne({ ...params, user: { dni: params.dni, status: true } }, { user: true })
  }

  async update(id: number, doctor: UpdateDoctorRequestDTO): Promise<Doctor> {
    const currentDoctor = await this.repository.findOne({ id }, { user: true });
    const user = await this.userService.update(currentDoctor.user.id, { ...doctor });
    if (doctor.email) {
      const credential = await this.credentialService.findByUser(currentDoctor.user.id);
      if (credential.email !== doctor.email) {
        await this.credentialService.updateUsername(credential.id, doctor.email);
      }
    }
    currentDoctor.user = user;
    return currentDoctor;
  }

  async uploadSignature(id: number, signature: Express.Multer.File): Promise<void> {
    const doctor = await this.repository.findOne({ id }, { user: true });
    const directory = doctor.user.dni;
    const uploaded = await this.storage.saveFile(signature, path.resolve(`signatures/${directory}`));
    await this.repository.findOneAndUpdate({ id }, { signature: `${directory}/${uploaded}` });
  }
}
