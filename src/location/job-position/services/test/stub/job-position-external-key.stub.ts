import { JobPositionExternalKey } from "@/location/job-position/entities/job-position-external-key.entity";

const stubJobPositionExternalKey = (id: number): JobPositionExternalKey => ({
    id: id,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockJobPositionExternalKey = () => stubJobPositionExternalKey(1);
export const mockJobPositionExternalKeys = () => [1, 2, 3, 4, 5].map(stubJobPositionExternalKey);