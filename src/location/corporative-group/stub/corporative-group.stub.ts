import { CorporativeGroup } from "../dtos/response/corporative-group.base.dto";

const stubCorporativeGroup = (id: number): CorporativeGroup => ({
    id: id,
    name: "my-corporative-group"
});

export const mockCorporativeGroup = () => stubCorporativeGroup(1);
export const mockCorporativeGroups = () => [1, 2, 3, 4, 5].map(stubCorporativeGroup);