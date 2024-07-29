import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserManagementService } from "@/user/user/services/user-management.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostDoctorRequestDto } from "../dtos/request/post.doctor.dto";
import { PatchDoctorRequestDto } from "../dtos/request/patch.doctor.request.dto";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorResponseDto } from "../dtos/response/base.doctor.response.dto";
import { DoctorFlatService } from "./doctor-flat.service";
import { User } from "@/user/user/entities/user.entity";

type ConnectionRequestType = PostDoctorRequestDto | PatchDoctorRequestDto;

@Injectable()
export class DoctorExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, DoctorResponseDto> {
    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(UserManagementService) private readonly userService: UserManagementService,
        @Inject(DoctorFlatService) private readonly flatService: DoctorFlatService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<DoctorResponseDto> {
        throw new Error("Method not implemented.");
    }

    async create({ ...user }: PostDoctorRequestDto): Promise<DoctorResponseDto> {
        let newUser: User;
        try {
            const existDoctor = await this.repository.findOne({ where: { user: { dni: user.dni } } });
            if (existDoctor) {
                throw new ConflictException('A doctor already uses the dni');
            }
        } catch (error) {}
        try {
            newUser = await this.userService.findOneByDni(user.dni);
        } catch (error) {
            newUser = await this.userService.create(user);
        }
        const doctor = await this.repository.create({ user: newUser });
        const flatDoctor = this.flatService.flat(doctor);
        return flatDoctor;
    }

    async findOneOrCreate({ ...user }: PostDoctorRequestDto): Promise<DoctorResponseDto> {
        try {
            const foundUser = await this.repository.findOne({
                where: { user: { dni: user.dni } },
                relations: { user: true }
            });
            const flatDoctor = this.flatService.flat(foundUser);
            return flatDoctor;
        } catch (error) {
            return this.create({ ...user });
        }
    }

    async findOneAndUpdate(id: string, { ...user }: PatchDoctorRequestDto): Promise<DoctorResponseDto> {
        const doctor = await this.repository.findOne({
            where: { user: { dni: id } },
            select: { user: { id: true } }
        });
        const foundUser = await this.userService.updateOne(doctor.user.id, user);
        doctor.user = foundUser;
        const flatDoctor = this.flatService.flat(doctor);
        return flatDoctor;
    }
}