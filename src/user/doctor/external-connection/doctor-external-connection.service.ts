import {
    Inject,
    Injectable
} from "@nestjs/common";
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

    async create({ ...user }: CreateDoctorExternalRequestDTO): Promise<Doctor> {
        const newUser = await this.userService.create(user);
        const doctor = await this.repository.create({ user: newUser });
        return doctor;
    }

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

    async findOneAndUpdate(id: number, { ...user }: FindOneDoctorAndUpdateRequestDTO): Promise<Doctor> {
        const doctor = await this.repository.findOne({
            where: { id },
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