import { FlatService } from "@/shared/utils/bases/base.flat-service";
import { Injectable, Provider } from "@nestjs/common";
import { Patient } from "../entities/patient.entity";
import { PatientEeqResponseDto } from "../dtos/response/base.patient-eeq.response.dto";

@Injectable()
export class PatientEeqFlatService implements FlatService<Patient, PatientEeqResponseDto | null> {
    flat({ user, ...patient }: Patient): PatientEeqResponseDto | null {
        const { extraAttributes, id, status, hasCredential, email, ...userData } = user;
        const role = extraAttributes.find(e => e.name === 'role');
        if (!role) return null;
        return {
            ...userData,
            ...patient,
            user: user.id,
            role: role.value,
        };
    }
}

export const INJECT_PATIENT_EEQ_FLAT_SERVICE: string = 'INJECT_PATIENT_EEQ_FLAT_SERVICE';
export const PatientEeqFlatProvider: Provider = {
    provide: INJECT_PATIENT_EEQ_FLAT_SERVICE,
    useClass: PatientEeqFlatService
}