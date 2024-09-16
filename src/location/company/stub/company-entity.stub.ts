import { CompanyEntity } from "@/location/company/entities/company.entity";
import { CorporativeGroupEntity } from "@/location/corporative-group/entities/corporative-group.entity";

const stubCompanyEntity = (id: number): CompanyEntity => ({
    id: 1,
    ruc: "1234567890",
    name: "Stub name",
    address: "Stub address",
    phone: "0999999999",
    status: true,
    branches: [],
    corporativeGroup: { id: 1 } as CorporativeGroupEntity,
    externalKey: undefined,
    createAt: new Date(),
    updateAt: new Date()
});


export const mockCompanyEntity = () => stubCompanyEntity(1);
export const mockCompanyEntities = () => [1, 2, 3, 4, 5].map(stubCompanyEntity);