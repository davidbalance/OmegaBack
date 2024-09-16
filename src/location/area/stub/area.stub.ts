import { Area } from "../dtos/response/area.base.dto";

const stubArea = (id: number): Area => ({
    id: id,
    name: "Stub city",
    management: 1
});

export const mockArea = () => stubArea(1);
export const mockAreas = () => [1, 2, 3, 4, 5].map(stubArea);