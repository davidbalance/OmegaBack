import { CorporativeGroupExternalKeyEntity } from "@/location/corporative-group/entities/corporative-group-external-key.entity";
import { CorporativeGroupEntity } from "@/location/corporative-group/entities/corporative-group.entity";


const stubCorporativeGroupEntity = (id: number): CorporativeGroupEntity => ({
    id: id,
    name: "my-corporative-group",
    companies: [],
    status: true,
    externalKey: {} as CorporativeGroupExternalKeyEntity,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockCorporativeGroupEntity = () => stubCorporativeGroupEntity(1);
export const mockCorporativeGroupEntities = () => [1, 2, 3, 4, 5].map(stubCorporativeGroupEntity);