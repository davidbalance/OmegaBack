import { Inject, Injectable } from "@nestjs/common";
import { DoctorRepository } from "../doctor.repository";
import { Doctor } from "../entities/doctor.entity";
import {
    CreateDoctorExternalRequestDTO,
    FindOneDoctorAndUpdateRequestDTO
} from "@/user/common";
import { UserService } from "@/user/user/user.service";

@Injectable()
export class DoctorExternalConnectionService {
    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(UserService) private readonly userService: UserService
    ) { }

    /**
     * Creates a doctor with the given options
     * @param param0 
     * @returns Doctor
     */
    async create({ ...user }: CreateDoctorExternalRequestDTO): Promise<Doctor> {
        const newUser = await this.userService.create(user);
        const doctor = await this.repository.create({ user: newUser });
        return doctor;
    }

    /**
     * Find one doctor if not exists creates one with the given options
     * @param param0 
     * @returns Doctor
     */
    async findOneOrCreate({ ...user }: CreateDoctorExternalRequestDTO): Promise<Doctor> {
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
            return this.create({ ...user });
        }
    }

    /**
     * Find one doctor and updates it with the given value
     * @param id 
     * @param param1 
     * @returns Doctor
     */
    async findOneAndUpdate(id: string, { ...user }: FindOneDoctorAndUpdateRequestDTO): Promise<Doctor> {
        const doctor = await this.repository.findOne({
            where: {
                user: {
                    dni: id
                }
            },
            select: {
                user: {
                    id: true
                }
            }
        });
        const foundUser = await this.userService.findOneAndUpdate(doctor.user.id, user);
        doctor.user = foundUser;
        return doctor;
    }
}