import { Inject, Injectable } from "@nestjs/common";
import { Doctor } from "../entities/doctor.entity";
import { UserManagementService } from "@/user/user/services/user-management.service";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { PATCHDoctorRequestDto } from "../dtos/patch.doctor-management.dto";
import { POSTDoctorRequestDto } from "../dtos/post.doctor-management.dto";
import { DoctorRepository } from "../repositories/doctor.repository";

type DoctorRequest = POSTDoctorRequestDto | PATCHDoctorRequestDto;

@Injectable()
export class DoctorExternalConnectionService implements IExternalConnectionService<DoctorRequest, Doctor> {
    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(UserManagementService) private readonly userService: UserManagementService
    ) { }

    async create({ ...user }: POSTDoctorRequestDto): Promise<Doctor> {
        let newUser;
        try {
            newUser = await this.userService.findOneByDni(user.dni);
        } catch (error) {
            newUser = await this.userService.create(user);
        }
        const doctor = await this.repository.create({ user: newUser });
        return doctor;
    }

    async findOneOrCreate({ ...user }: POSTDoctorRequestDto): Promise<Doctor> {
        try {
            const foundUser = await this.repository.findOne({
                where: {
                    user: { dni: user.dni }
                },
                relations: { user: true }
            });
            return foundUser;
        } catch (error) {
            return this.create({ ...user });
        }
    }

    async findOneAndUpdate(id: string, { ...user }: PATCHDoctorRequestDto): Promise<Doctor> {
        const doctor = await this.repository.findOne({
            where: {
                user: { dni: id }
            },
            select: {
                user: { id: true }
            }
        });
        const foundUser = await this.userService.updateOne(doctor.user.id, user);
        doctor.user = foundUser;
        return doctor;
    }
}