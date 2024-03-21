import { Patient } from "@/user/patient/entities/patient.entity";

export class CreatePatientResponseDTO { }

export class FindOnePatientResponseDTO {
    public readonly patient: Patient;
}

export class FindPatientsResponseDTO {
    public readonly patients: Patient[];
}

export class UpdatePatientResponseDTO { }