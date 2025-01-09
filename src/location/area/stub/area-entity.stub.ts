import { AreaEntity } from "@/location/area/entities/area.entity";

const stubAreaEntity = (id: number): AreaEntity => ({
    id: id,
    name: "my-stub-name",
    createAt: new Date(),
    updateAt: new Date(),
    status: true
});

export const mockAreaEntity = () => stubAreaEntity(1);
export const mockAreaEntities = () => [1, 2, 3, 4, 5].map(stubAreaEntity);