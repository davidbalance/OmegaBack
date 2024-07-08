import { Inject, Injectable } from "@nestjs/common";
import { PatientRepository } from "../patient.repository";
import { Patient } from "../entities/patient.entity";
import { UserService } from "@/user/user/user.service";
import { PATCHPatientRequestDto, POSTPatientRequestDto } from "../dtos/patient.request.dto";

@Injectable()
export class ExternalConnectionService {
    constructor(
        @Inject(PatientRepository) private readonly repository: PatientRepository,
        @Inject(UserService) private readonly userService: UserService
    ) { }

    /**
     * Crea un paciente.
     * @param param0 
     * @returns 
     */
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

    /**
     * Encuentra un paciente si no existe lo crea.
     * @param param0 
     * @returns 
     */
    async findOneOrCreate({ birthday, gender, ...user }: POSTPatientRequestDto): Promise<Patient> {
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

    /**
     * Encuentra un paciente y lo modifica.
     * @param id 
     * @param param1 
     * @returns 
     */
    async findOneAndUpdate(id: string, { birthday, gender, ...user }: PATCHPatientRequestDto): Promise<Patient> {
        const patient = await this.repository.findOne({ where: { user: { dni: id } }, select: { user: { id: true } } });
        await this.userService.findOneAndUpdate(patient.user.id, { ...user, email: null });
        const updatedPatient = await this.repository.findOneAndUpdate({ user: { dni: id } }, patient);
        return updatedPatient;
    }
}