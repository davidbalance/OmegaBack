import { DoctorEntity } from "../entities/doctor.entity";

const stubDoctorEntity = (id: number): DoctorEntity => ({
    id: id,
    hasFile: false,
    user: {
        id: 1,
        dniType: "",
        dni: "1234567890",
        email: "test@email.com",
        name: "Doctor",
        lastname: "Lastname",
        hasCredential: true,
        status: true,
        extraAttributes: [],
        createAt: new Date(),
        updateAt: new Date()
    },
    createAt: new Date(),
    updateAt: new Date()
});

export const mockDoctorEntity = () => stubDoctorEntity(1);
export const mockDoctorEntities = () => Array(20).map(stubDoctorEntity);