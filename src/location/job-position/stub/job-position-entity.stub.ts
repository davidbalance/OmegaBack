import { JobPositionEntity } from "@/location/job-position/entities/job-position.entity";

const stubJobPositionEntity = (id: number): JobPositionEntity => ({
    id: id,
    name: "my-stub-name",
    status: true,
    createAt: new Date(),
    updateAt: new Date(),
    externalKey: undefined
});

export const mockJobPositionEntity = () => stubJobPositionEntity(1);
export const mockJobPositionEntities = () => [1, 2, 3, 4, 5].map(stubJobPositionEntity);