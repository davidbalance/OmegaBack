import { Inject, Injectable } from "@nestjs/common";
import { Doctor } from "../entities/doctor.entity";
import { UserManagementService } from "@/user/user/services/user-management.service";
import { ExternalKeyParam, IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PostDoctorRequestDto } from "../dtos/request/post.doctor.dto";
import { PatchDoctorRequestDto } from "../dtos/request/patch.doctor.request.dto";
import { DoctorRepository } from "../repositories/doctor.repository";

type ConnectionRequestType = PostDoctorRequestDto | PatchDoctorRequestDto;

@Injectable()
export class DoctorExternalConnectionService implements IExternalConnectionService<ConnectionRequestType, Doctor> {
    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(UserManagementService) private readonly userService: UserManagementService
    ) { }

    findOne(key: ExternalKeyParam | any): Promise<Doctor> {
        throw new Error("Method not implemented.");
    }

    async create({ ...user }: PostDoctorRequestDto): Promise<Doctor> {
        let newUser;
        try {
            newUser = await this.userService.findOneByDni(user.dni);
        } catch (error) {
            newUser = await this.userService.create(user);
        }
        const doctor = await this.repository.create({ user: newUser });
        return doctor;
    }

    async findOneOrCreate({ ...user }: PostDoctorRequestDto): Promise<Doctor> {
        try {
            const foundUser = await this.repository.findOne({
                where: { user: { dni: user.dni } },
                relations: { user: true }
            });
            return foundUser;
        } catch (error) {
            return this.create({ ...user });
        }
    }

    async findOneAndUpdate(id: string, { ...user }: PatchDoctorRequestDto): Promise<Doctor> {
        const doctor = await this.repository.findOne({
            where: { user: { dni: id } },
            select: { user: { id: true } }
        });
        const foundUser = await this.userService.updateOne(doctor.user.id, user);
        doctor.user = foundUser;
        return doctor;
    }
}