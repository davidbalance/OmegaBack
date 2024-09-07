import { MedicalEmailEntity } from "@/medical/medical-client/entities/medical-email.entity";

const stubMail = (id: number): MedicalEmailEntity => ({
    id: id,
    email: "test@email.com",
    default: true,
    client: undefined,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalEmail = () => stubMail(1);
export const mockMedicalEmails = () => [1, 2, 3, 4, 5].map(stubMail);