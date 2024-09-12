import { ManagementEntity } from "@/location/management/entities/management.entity";

const stubManagement = (id: number): ManagementEntity => ({
    id: id,
    name: "my-stub-name",
    status: true,
    areas: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockManagement = () => stubManagement(1);
export const mockManagements = () => [1, 2, 3, 4, 5].map(stubManagement);