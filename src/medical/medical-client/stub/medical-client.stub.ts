import { MedicalClient } from "../dtos/response/medical-client.base.dto";

const stubMedicalClient = (id: number): MedicalClient => ({
    id: id,
    dni: "1234567890",
    name: "Mocked name",
    lastname: "Mocked lastname",
    createAt: new Date()
});

export const mockMedicalClient = () => stubMedicalClient(1);
export const mockMedicalClients = () => [1, 2, 3, 4, 5].map(stubMedicalClient);