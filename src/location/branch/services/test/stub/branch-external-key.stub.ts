import { BranchExternalKey } from "@/location/branch/entities/branch-external-key.entity";

const stubBranchExternalKey = (id: number): BranchExternalKey => ({
    id: 1,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});


export const mockBranchExternalKey = () => stubBranchExternalKey(1);