import { CorporativeGroupExternalKey } from "@/location/corporative-group/entities/corporative-group-external-key.entity";
import { CorporativeGroup } from "@/location/corporative-group/entities/corporative-group.entity";

const stubCorporativeGroup = (id: number): CorporativeGroup => ({
    id: id,
    name: "my-corporative-group",
    companies: [],
    status: true,
    externalKey: {} as CorporativeGroupExternalKey,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockCorporativeGroup = () => stubCorporativeGroup(1);
export const mockCorporativeGroups = () => [1, 2, 3, 4, 5].map(stubCorporativeGroup);