import { Company } from "@/location/company/entities/company.entity";
import { CorporativeGroup } from "@/location/corporative-group/entities/corporative-group.entity";

const stubCompany = (id: number): Company => ({
    id: 1,
    ruc: "1234567890",
    name: "my-stub-name",
    address: "my-stub-address",
    phone: "my-stub-phone",
    status: true,
    branches: [],
    corporativeGroup: {} as CorporativeGroup,
    externalKey: undefined,
    createAt: new Date(),
    updateAt: new Date()
});


export const mockCompany = () => stubCompany(1);
export const mockCompanies = () => [1, 2, 3, 4, 5].map(stubCompany);