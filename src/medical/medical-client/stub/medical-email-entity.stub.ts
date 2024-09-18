import { MedicalEmailEntity } from "@/medical/medical-client/entities/medical-email.entity";

const stubMailEntity = (id: number): MedicalEmailEntity => ({
    id: id,
    email: "test@email.com",
    default: true,
    client: { id: 1 } as any,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalEmailEntity = () => stubMailEntity(1);
export const mockMedicalEmailEntities = () => [1, 2, 3, 4, 5].map(stubMailEntity);