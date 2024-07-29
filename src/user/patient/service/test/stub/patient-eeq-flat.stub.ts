import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { PatientEeqResponseDto } from "@/user/patient/dtos/response/base.patient-eeq.response.dto";

const stubFlatPatientEeq = (id: number): PatientEeqResponseDto => ({
    id: id,
    gender: PatientGenderEnum.MALE,
    birthday: new Date(),
    user: 1,
    dni: "1234567890",
    name: "Stub name",
    lastname: "Stub lastname",
    role: 'stub-role'
});

export const mockFlatPatientEeq = () => stubFlatPatientEeq(1);
export const mockFlatPatientEeqs = () => [1, 2, 3, 4, 5].map(stubFlatPatientEeq);