import { ExternalPatient } from "../dtos/response/external-patient.base.dto";

const stubExternalPatient = (id: number): ExternalPatient => ({
    birthday: new Date(),
    gender: "male",
    user: 1,
    name: "Sample Name",
    lastname: "Sample Lastname",
    dni: "1234567890",
    id: id
});

export const mockExternalPatient = () => stubExternalPatient(1);
export const mockExternalPatients = () => Array(20).map(stubExternalPatient);