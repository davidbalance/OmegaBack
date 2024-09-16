import { AreaEntity } from "@/location/area/entities/area.entity";
import { ManagementEntity } from "@/location/management/entities/management.entity";

const stubAreaEntity = (id: number): AreaEntity => ({
    id: id,
    name: "my-stub-name",
    management: { id: 1 } as ManagementEntity,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockAreaEntity = () => stubAreaEntity(1);
export const mockAreaEntities = () => [1, 2, 3, 4, 5].map(stubAreaEntity);