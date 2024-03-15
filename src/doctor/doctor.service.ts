import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorAndAssignUserRequestDTO, CreateDoctorRequestDTO, UpdateDoctorRequestDTO } from 'src/shared';
import { User } from 'src/user/entities/user.entity';
import { UserCredentialService } from 'src/authentication/user-credential/user-credential.service';
import { UserService } from 'src/user/user.service';
import { StorageSaver } from 'src/shared/storage-saver';

interface DoctorServiceExtensions {
  /**
   * Creates a doctor using the given values
   * @param doctor 
   */
  create(doctor: CreateDoctorRequestDTO): Promise<Doctor>;
  /**
   * Creates a doctor using the given values
   * @param doctor 
   * @param user 
   */
  create(doctor: CreateDoctorAndAssignUserRequestDTO, user: number): Promise<Doctor>;
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
  update(id: number, doctor: UpdateDoctorRequestDTO): Promise<Doctor>;
  /**
   * 
   * @param id Uploads a doctor signature and stores it in an specific folder
   * @param signature 
   */
  uploadSignature(id: number, signature: Express.Multer.File): Promise<void>;
}

@Injectable()
export class DoctorService implements DoctorServiceExtensions {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
    @Inject(UserCredentialService) private readonly credentialService: UserCredentialService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(StorageSaver) private readonly storage: StorageSaver
  ) { }

  create(doctor: CreateDoctorRequestDTO): Promise<Doctor>;
  create(doctor: CreateDoctorAndAssignUserRequestDTO, user: number): Promise<Doctor>;
  async create(doctor: CreateDoctorRequestDTO | CreateDoctorAndAssignUserRequestDTO, userOrUndefined?: number): Promise<Doctor> {
    let user: User = null;
    if (userOrUndefined) {
      user = await this.userService.readOneByID(userOrUndefined);
    } else {
      user = await this.userService.create(doctor as CreateDoctorRequestDTO);
      await this.credentialService.create(doctor as CreateDoctorRequestDTO, user.id);
    }
    return await this.repository.create({ ...doctor, user: user });
  }

  async readAll(): Promise<Doctor[]> {
    return await this.repository.find({ user: { status: true } }, { user: true });
  }

  async readOneByID(id: number): Promise<Doctor> {
    return await this.repository.findOne({ id, user: { status: true } }, { user: true })
  }

  async update(id: number, doctor: UpdateDoctorRequestDTO): Promise<Doctor> {
    const currentDoctor = await this.repository.findOne({ id }, { user: true });
    const user = await this.userService.update(currentDoctor.user.id, { ...doctor });
    if (doctor.email) {
      const credential = await this.credentialService.readByUser(currentDoctor.user.id);
      if (credential.email !== doctor.email) {
        await this.credentialService.updateUsername(credential.id, doctor.email);
      }
    }
    currentDoctor.user = user;
    return currentDoctor;
    // return await this.repository.findOneAndUpdate({ id }, { signature: currentDoctor.signature });
  }

  async uploadSignature(id: number, signature: Express.Multer.File): Promise<void> {
    const doctor = await this.repository.findOne({ id }, { user: true });
    const directory = doctor.user.dni;
    const uploaded = await this.storage.saveFile(signature, directory);
    await this.repository.findOneAndUpdate({ id }, { signature: `${directory}/${uploaded}` });
  }
}
