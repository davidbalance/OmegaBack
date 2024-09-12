import { Patient } from "../dtos/response/patient.base.dto";

const stubPatient = (id: number): Patient => ({
    birthday: new Date(),
    gender: "male",
    user: 1,
    name: "Sample Name",
    lastname: "Sample Lastname",
    dni: "1234567890",
    id: id
});

export const mockPatient = () => stubPatient(1);
export const mockPatients = () => Array(20).map(stubPatient);