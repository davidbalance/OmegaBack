import { Inject, Injectable } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";
import { Patient } from "../entities/patient.entity";
import { UserManagementService } from "@/user/user/services/user-management.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostPatientRequestDto } from "../dtos/request/post.patient.request.dto";
import { PatchPatientRequestDto } from "../dtos/request/patch.patient.request.dto";
import { PatientResponseDto } from "../dtos/response/base.patient.response.dto";
import { FlatService } from "@/shared/utils/bases/base.flat-service";
import { INJECT_PATIENT_FLAT_SERVICE } from "./patient-flat.service";

type ConnectionRequestType = PostPatientRequestDto | PatchPatientRequestDto

@Injectable()
export class PatientExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, PatientResponseDto> {
    constructor(
        @Inject(PatientRepository) private readonly repository: PatientRepository,
        @Inject(UserManagementService) private readonly userService: UserManagementService,
        @Inject(INJECT_PATIENT_FLAT_SERVICE) private readonly flatService: FlatService<Patient, PatientResponseDto>
    ) { }

    async findOne(key: ExternalKeyParam | any): Promise<PatientResponseDto> {
        throw new Error("Method not implemented.");
    }

    async create({ birthday, gender, ...user }: PostPatientRequestDto): Promise<PatientResponseDto> {
        let newUser;
        try {
            newUser = await this.userService.findOneByDni(user.dni);
        } catch (error) {
            newUser = await this.userService.create({ ...user, email: null });
        }
        const patient = await this.repository.create({ birthday, gender, user: newUser });
        const flatPatient = this.flatService.flat(patient);
        return flatPatient;
    }

    async findOneOrCreate({ birthday, gender, ...user }: PostPatientRequestDto): Promise<PatientResponseDto> {
        try {
            const patient = await this.repository.findOne({
                where: {
                    user: { dni: user.dni }
                },
                relations: { user: true }
            });
            const flatPatient = this.flatService.flat(patient);
            return flatPatient;
        } catch (error) {
            return this.create({ birthday, gender, ...user });
        }
    }

    async findOneAndUpdate(id: string, { birthday, gender, ...user }: PatchPatientRequestDto): Promise<PatientResponseDto> {
        const patient = await this.repository.findOne({
            where: { user: { dni: id } },
            select: { user: { id: true } }
        });
        const updatedUser = await this.userService.updateOne(patient.user.id, { ...user, email: null });
        const updatedPatient = await this.repository.findOneAndUpdate({ user: { dni: id } }, patient);
        const flatPatient = this.flatService.flat({ ...updatedPatient, user: updatedUser });
        return flatPatient;
    }
}