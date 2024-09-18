import { MedicalEmail } from "../dtos/response/medical-email.base.dto";

const stubMail = (id: number): MedicalEmail => ({
    id: id,
    email: "test@email.com",
    default: true,
});

export const mockMedicalEmail = () => stubMail(1);
export const mockMedicalEmails = () => Array(10).map(stubMail);