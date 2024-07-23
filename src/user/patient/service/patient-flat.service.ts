import { FlatService } from "@/shared/utils/bases/base.flat-service";
import { Injectable, Provider } from "@nestjs/common";
import { Patient } from "../entities/patient.entity";
import { PatientResponseDto } from "../dtos/response/base.patient.response.dto";

@Injectable()
export class PatientFlatService implements FlatService<Patient, PatientResponseDto> {
    flat({ user, ...patient }: Patient): PatientResponseDto {
        return { ...user, ...patient, user: user.id }
    }
}

export const INJECT_PATIENT_FLAT_SERVICE: string = 'INJECT_PATIENT_FLAT_SERVICE';
export const PatientFlatProvider: Provider = {
    provide: INJECT_PATIENT_FLAT_SERVICE,
    useClass: PatientFlatService
}