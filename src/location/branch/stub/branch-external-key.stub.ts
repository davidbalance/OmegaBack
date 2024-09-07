import { BranchExternalKeyEntity } from "@/location/branch/entities/branch-external-key.entity";

const stubBranchExternalKey = (id: number): BranchExternalKeyEntity => ({
    id: 1,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});


export const mockBranchExternalKey = () => stubBranchExternalKey(1);