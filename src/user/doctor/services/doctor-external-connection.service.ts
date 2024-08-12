import { Inject, Injectable } from "@nestjs/common";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostDoctorRequestDto } from "../dtos/request/post.doctor.dto";
import { PatchDoctorRequestDto } from "../dtos/request/patch.doctor.request.dto";
import { DoctorResponseDto } from "../dtos/response/base.doctor.response.dto";
import { DoctorManagementService } from "./doctor-management.service";

type ConnectionRequestType = PostDoctorRequestDto | PatchDoctorRequestDto;

@Injectable()
export class DoctorExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, DoctorResponseDto> {
    constructor(
        @Inject(DoctorManagementService) private readonly managementService: DoctorManagementService
    ) { }

    async create({ ...user }: PostDoctorRequestDto): Promise<DoctorResponseDto> {
        return await this.managementService.create(user);
    }

    async findOne(dni: string): Promise<DoctorResponseDto> {
        return this.managementService.findOneByDni(dni);
    }

    async findOneOrCreate(data: PostDoctorRequestDto): Promise<DoctorResponseDto> {
        try {
            return await this.managementService.findOneByDni(data.dni);
        } catch (error) {
            return await this.create(data);
        }
    }

    async findOneAndUpdate(dni: string, data: PatchDoctorRequestDto): Promise<DoctorResponseDto> {
        return await this.managementService.updateOneByDni(dni, data);
    }
}