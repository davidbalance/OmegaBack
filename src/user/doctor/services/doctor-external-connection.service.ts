import { Inject, Injectable } from "@nestjs/common";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostDoctorRequestDto } from "../dtos/request/doctor.post.dto";
import { PatchDoctorRequestDto } from "../dtos/request/doctor.patch.dto";
import { DoctorManagementService } from "./doctor-management.service";
import { Doctor } from "../dtos/response/doctor.base.dto";

type ConnectionRequestType = PostDoctorRequestDto | PatchDoctorRequestDto;

@Injectable()
export class DoctorExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, Doctor> {
    constructor(
        @Inject(DoctorManagementService) private readonly managementService: DoctorManagementService
    ) { }

    async create({ ...user }: PostDoctorRequestDto): Promise<Doctor> {
        return await this.managementService.create(user);
    }

    async findOne(dni: string): Promise<Doctor> {
        return this.managementService.findOneByDni(dni);
    }

    async findOneOrCreate(data: PostDoctorRequestDto): Promise<Doctor> {
        try {
            return await this.managementService.findOneByDni(data.dni);
        } catch (error) {
            return await this.create(data);
        }
    }

    async findOneAndUpdate(dni: string, data: PatchDoctorRequestDto): Promise<Doctor> {
        return await this.managementService.updateOneByDni(dni, data);
    }
}