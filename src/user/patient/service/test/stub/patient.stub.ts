import { PatientGenderEnum } from "@/user/patient/common/enums/patient.enum";
import { FlatEEQPatientResponseDto } from "@/user/patient/dtos/patient.dto";
import { Patient } from "@/user/patient/entities/patient.entity";
import { mockUser } from "@/user/user/services/test/stub/user-management.stub";
import { resolve } from "dns";

const stubPatient = (id: number): Patient => ({
    id: id,
    gender: PatientGenderEnum.MALE,
    birthday: new Date(),
    user: mockUser(),
    createAt: new Date(),
    updateAt: new Date()
});

export const mockPatient = () => stubPatient(1);
export const mockPatients = () => [1, 2, 3, 4, 5].map(stubPatient);

export const flatPatient = (patient: Patient): FlatEEQPatientResponseDto => {
    const role = patient.user.extraAttributes.find(e => e.name === 'role');
    if (!role) return null;
    const flattenedPatient: FlatEEQPatientResponseDto = { ...patient.user, ...patient, user: patient.user.id, role: role.value };
    return flattenedPatient;
}

export const flattenPatients = (patients: Patient[]) => patients.map(flatPatient).filter(e => !!e);