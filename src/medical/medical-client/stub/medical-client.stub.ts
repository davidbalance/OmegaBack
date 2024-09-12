import { MedicalClientEntity } from "../entities/medical-client.entity";
import { mockMedicalEmails } from "./medical-email.stub";

const stubMedicalClient = (id: number): MedicalClientEntity => ({
    id: id,
    dni: "1234567890",
    name: "Mocked name",
    lastname: "Mocked lastname",
    birthday: new Date('2000/01/01'),
    gender: "male",
    jobPositionName: "Test position",
    managementId: 1,
    managementName: "Test management",
    areaId: 1,
    areaName: "Test area",
    medicalOrders: [],
    email: mockMedicalEmails(),
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalClient = () => stubMedicalClient(1);
export const mockMedicalClients = () => [1, 2, 3, 4, 5].map(stubMedicalClient);