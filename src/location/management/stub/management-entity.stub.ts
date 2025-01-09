import { ManagementEntity } from "@/location/management/entities/management.entity";

const stubManagementEntity = (id: number): ManagementEntity => ({
    id: id,
    name: "my-stub-name",
    status: true,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockManagementEntity = () => stubManagementEntity(1);
export const mockManagementEntities = () => [1, 2, 3, 4, 5].map(stubManagementEntity);