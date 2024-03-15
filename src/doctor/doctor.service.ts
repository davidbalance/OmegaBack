import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorRequestDTO, UpdateDoctorRequestDTO } from 'src/shared';
import { User } from 'src/user/entities/user.entity';
import { UserCredentialService } from 'src/authentication/user-credential/user-credential.service';
import { UserService } from 'src/user/user.service';

interface DoctorServiceExtensions {
  /**
   * Creates a doctor using the given values
   * @param doctor 
   */
  create(doctor: CreateDoctorRequestDTO, signature: Express.Multer.File): Promise<Doctor>;
  /**
   * Creates a doctor using the given values
   * @param doctor 
   * @param user 
   */
  create(doctor: CreateDoctorRequestDTO, signature: Express.Multer.File, user: number): Promise<Doctor>;
  /**
   * Find all the doctors that have an active user
   */
  readAll(): Promise<Doctor[]>;
  /**
   * Find one active doctor
   * @param id 
   */
  readOneByID(id: number): Promise<Doctor>;
  /**
   * Finds and updates a doctor with the given values
   * @param id 
   * @param doctor 
   */
  update(id: number, signature: Express.Multer.File, doctor: UpdateDoctorRequestDTO): Promise<Doctor>;
}

@Injectable()
export class DoctorService implements DoctorServiceExtensions {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(UserCredentialService) private readonly credentialService: UserCredentialService,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  create(doctor: CreateDoctorRequestDTO, signature: Express.Multer.File): Promise<Doctor>;
  create(doctor: CreateDoctorRequestDTO, signature: Express.Multer.File, user: number): Promise<Doctor>;
  async create(doctor: CreateDoctorRequestDTO, signature: Express.Multer.File, userOrUndefined?: number): Promise<Doctor> {
    let user: User = null;
    if (userOrUndefined) {
      user = await this.userService.readOneByID(userOrUndefined);
    } else {
      user = await this.userService.create(doctor);
      await this.credentialService.create(doctor, user.id);
    }
    return await this.repository.create({ ...doctor, user: user });
  }

  async readAll(): Promise<Doctor[]> {
    return await this.repository.find({ user: { status: true } }, { user: true });
  }

  async readOneByID(id: number): Promise<Doctor> {
    return await this.repository.findOne({ id, user: { status: true } }, { user: true })
  }

  async update(id: number, signature: Express.Multer.File, doctor: UpdateDoctorRequestDTO): Promise<Doctor> {
    const currentDoctor = await this.repository.findOne({ id }, { user: true });
    await this.userService.update(currentDoctor.user.id, doctor);
    if (doctor.email) {
      const credential = await this.credentialService.readByUser(currentDoctor.user.id);
      if (credential.email !== doctor.email) {
        await this.credentialService.updateUsername(credential.id, doctor.email);
      }
    }
    return await this.repository.findOneAndUpdate({ id }, doctor);
  }
}
