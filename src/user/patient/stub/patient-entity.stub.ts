import { PatientEntity } from "../entities/patient.entity";
import { PatientGenderEnum } from "../enums/patient.enum";

const stubPatientEntity = (id: number): PatientEntity => ({
    id: id,
    birthday: new Date(),
    gender: PatientGenderEnum.MALE,
    user: {
        id: 0,
        dni: "1234567890",
        dniType: "dni",
        email: "test@email.com",
        name: "Stub name",
        lastname: "Stub lastname",
        hasCredential: true,
        status: true,
        extraAttributes: [],
        createAt: new Date(),
        updateAt: new Date()
    },
    createAt: new Date(),
    updateAt: new Date()
});

export const mockPatientEntity = () => stubPatientEntity(1);
export const mockPatientEntities = () => Array(20).map(stubPatientEntity);