import { PatientEeq } from "../dtos/response/patient-eeq.base.dto";

const stubEeqPatient = (id: number): PatientEeq => ({
    birthday: new Date(),
    gender: "male",
    user: 1,
    name: "Sample Name",
    lastname: "Sample Lastname",
    dni: "1234567890",
    id: id,
    role: "role"
});

export const mockEeqPatient = () => stubEeqPatient(1);
export const mockEeqPatients = () => Array(20).map(stubEeqPatient);