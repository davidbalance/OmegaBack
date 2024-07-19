import { JobPosition } from "@/location/job-position/entities/job-position.entity";

const stubJobPosition = (id: number): JobPosition => ({
    id: id,
    name: "my-stub-name",
    status: true,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockJobPosition = () => stubJobPosition(1);
export const mockJobPositions = () => [1, 2, 3, 4, 5].map(stubJobPosition);