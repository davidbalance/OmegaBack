import { JobPosition } from "../dtos/response/job-position.base.dto";

const stubJobPosition = (id: number): JobPosition => ({
    id: id,
    name: "my-stub-name"
});

export const mockJobPosition = () => stubJobPosition(1);
export const mockJobPositions = () => [1, 2, 3, 4, 5].map(stubJobPosition);