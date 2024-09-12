import { CorporativeGroupExternalKeyEntity } from "@/location/corporative-group/entities/corporative-group-external-key.entity";

const stubCorporativeGroupExternalKey = (id: number): CorporativeGroupExternalKeyEntity => ({
    id: id,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockCorporativeGroupExternalKey = () => stubCorporativeGroupExternalKey(1);
export const mockCorporativeGroupExternalKeys = () => [1, 2, 3, 4, 5].map(stubCorporativeGroupExternalKey);