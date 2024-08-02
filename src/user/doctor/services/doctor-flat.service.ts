import { Injectable } from "@nestjs/common";
import { Doctor } from "../entities/doctor.entity";
import { DoctorResponseDto } from "../dtos/response/base.doctor.response.dto";
import { FlatService } from "@/shared/utils/bases/base.flat-service";

@Injectable()
export class DoctorFlatService implements FlatService<Doctor, DoctorResponseDto> {
    flat({ user, ...doctor }: Doctor): DoctorResponseDto {
        return {
            ...user,
            ...doctor,
            user: user.id
        };
    }
}