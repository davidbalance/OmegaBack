import { Patient } from "@/user/patient/entities/patient.entity";
import { FindUserBase } from "./user.response.dto";
import { PatientGenderEnum } from "../enums";

export class FindPatient
    extends FindUserBase
    implements Omit<Patient, 'id' | 'user' | 'createAt' | 'updateAt'> {
    public readonly gender: PatientGenderEnum;
    public readonly birthday: Date;
    public readonly age: number;
}

export class CreatePatientResponseDTO {
    public readonly patient: number;
}

export class FindPatientsResponseDTO {
    public readonly patients: FindPatient[];
}

export class FindOnePatientResponseDTO {
    public readonly patient: FindPatient;
}

export class FindOnePatientAndUpdateResponseDTO { }