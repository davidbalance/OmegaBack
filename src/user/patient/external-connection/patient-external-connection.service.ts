import { Inject, Injectable } from "@nestjs/common";
import { PatientRepository } from "../patient.repository";
import { CreatePatientExternalRequestDTO, FindOnePatientAndUpdateRequestDTO } from "@/user/common";
import { Patient } from "../entities/patient.entity";
import { UserService } from "@/user/user/user.service";

@Injectable()
export class PatientExternalConnectionService {
    constructor(
        @Inject(PatientRepository) private readonly repository: PatientRepository,
        @Inject(UserService) private readonly userService: UserService
    ) { }

    async create({ birthday, gender, ...user }: CreatePatientExternalRequestDTO): Promise<Patient> {
        const newUser = await this.userService.create(user);
        const patient = await this.repository.create({ birthday, gender, user: newUser });
        return patient;
    }

    async findOneOrCreate({ birthday, gender, ...user }: CreatePatientExternalRequestDTO): Promise<Patient> {
        try {
            const foundUser = await this.repository.findOne({
                where: {
                    user: {
                        dni: user.dni
                    }
                },
                relations: {
                    user: true
                }
            });
            return foundUser;
        } catch (error) {
            return this.create({ birthday, gender, ...user });
        }
    }

    async findOneAndUpdate(id: string, { birthday, gender, ...user }: FindOnePatientAndUpdateRequestDTO): Promise<Patient> {
        const patient = await this.repository.findOne({ where: { user: { dni: id } }, select: { user: { id: true } } });
        await this.userService.findOneAndUpdate(patient.user.id, { ...user });
        const updatedPatient = await this.repository.findOneAndUpdate({ user: { dni: id } }, patient);
        return updatedPatient;
    }
}