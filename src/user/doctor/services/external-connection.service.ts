import { Inject, Injectable } from "@nestjs/common";
import { DoctorRepository } from "../doctor.repository";
import { Doctor } from "../entities/doctor.entity";

import { UserService } from "@/user/user/user.service";
import { PATCHDoctorRequestDto, POSTDoctorRequestDto } from "../dtos/doctor.request.dto";

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(DoctorRepository) private readonly repository: DoctorRepository,
        @Inject(UserService) private readonly userService: UserService
    ) { }

    /**
     * Crea un paciente.
     * @param param0 
     * @returns 
     */
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

    /**
     * Encuentra un paciente si no existe lo crea.
     * @param param0 
     * @returns 
     */
    async findOneOrCreate({ ...user }: POSTDoctorRequestDto): Promise<Doctor> {
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
     * Encuentra un paciente y lo modifica.
     * @param id 
     * @param param1 
     * @returns 
     */
    async findOneAndUpdate(id: string, { ...user }: PATCHDoctorRequestDto): Promise<Doctor> {
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