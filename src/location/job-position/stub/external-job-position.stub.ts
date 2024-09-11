import { JobPosition } from "../dtos/response/job-position.base.dto";

const stubExternalJobPosition = (id: number): JobPosition => ({
    id: id,
    name: "my-stub-name"
});

export const mockExternalJobPosition = () => stubExternalJobPosition(1);
export const mockExternalJobPositions = () => [1, 2, 3, 4, 5].map(stubExternalJobPosition);