import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { PatientResponseDto } from "@/user/patient/dtos/response/base.patient.response.dto";

const stubFlatPatient = (id: number): PatientResponseDto => ({
    id: id,
    gender: PatientGenderEnum.MALE,
    birthday: new Date(),
    user: 1,
    dni: "1234567890",
    name: "Stub name",
    lastname: "Stub lastname"
});

export const mockFlatPatient = () => stubFlatPatient(1);
export const mockFlatPatients = () => [1, 2, 3, 4, 5].map(stubFlatPatient);