import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { Patient } from "@/user/patient/entities/patient.entity";
import { mockUser } from "@/user/user/services/test/stub/user-management.stub";

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