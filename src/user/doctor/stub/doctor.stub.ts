import { Doctor } from "../dtos/response/doctor.base.dto";

const stubDoctor = (id: number): Doctor => ({
    user: 1,
    hasFile: false,
    id: id,
    dni: "1234567890",
    email: "test@email.com",
    name: "Doctor",
    lastname: "Lastname",
    hasCredential: true
});

export const mockDoctor = () => stubDoctor(1);
export const mockDoctors = () => Array(20).map(stubDoctor);