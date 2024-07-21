import { Inject, Injectable } from "@nestjs/common";
import { PatientRepository } from "../patient.repository";
import { Patient } from "../entities/patient.entity";
import { UserManagementService } from "@/user/user/services/user-management.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PATCHPatientRequestDto } from "../dtos/patch.patient-management.dto";
import { POSTPatientRequestDto } from "../dtos/post.patient-management,dto";

@Injectable()
export class PatientExternalConnectionService implements IExternalConnectionService<POSTPatientRequestDto | PATCHPatientRequestDto, Patient> {
    constructor(
        @Inject(PatientRepository) private readonly repository: PatientRepository,
        @Inject(UserManagementService) private readonly userService: UserManagementService
    ) { }
    
    findOne(key: ExternalKeyParam | any): Promise<Patient> {
        throw new Error("Method not implemented.");
    }

    async create({ birthday, gender, ...user }: POSTPatientRequestDto): Promise<Patient> {
        let newUser;
        try {
            newUser = await this.userService.findOneByDni(user.dni);
        } catch (error) {
            newUser = await this.userService.create({ ...user, email: null });
        }
        const patient = await this.repository.create({ birthday, gender, user: newUser });
        return patient;
    }

    async findOneOrCreate({ birthday, gender, ...user }: POSTPatientRequestDto): Promise<Patient> {
        try {
            const foundUser = await this.repository.findOne({
                where: {
                    user: { dni: user.dni }
                },
                relations: { user: true }
            });
            return foundUser;
        } catch (error) {
            return this.create({ birthday, gender, ...user });
        }
    }

    async findOneAndUpdate(id: string, { birthday, gender, ...user }: PATCHPatientRequestDto): Promise<Patient> {
        const patient = await this.repository.findOne({
            where: { user: { dni: id } },
            select: { user: { id: true } }
        });
        await this.userService.updateOne(patient.user.id, { ...user, email: null });
        const updatedPatient = await this.repository.findOneAndUpdate({ user: { dni: id } }, patient);
        return updatedPatient;
    }
}