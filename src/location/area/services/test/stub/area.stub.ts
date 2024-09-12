import { AreaEntity } from "@/location/area/entities/area.entity";

const stubArea = (id: number): AreaEntity => ({
    id: id,
    name: "my-stub-name",
    management: null,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockArea = () => stubArea(1);
export const mockAreas = () => [1, 2, 3, 4, 5].map(stubArea);