import { BranchEntity } from "@/location/branch/entities/branch.entity";
import { CityEntity } from "@/location/city/entities/city.entity";
import { CompanyEntity } from "@/location/company/entities/company.entity";

const stubBranch = (id: number): BranchEntity => ({
    id: id,
    name: "my-stub-name",
    status: true,
    company: {} as CompanyEntity,
    city: {} as CityEntity,
    externalKey: undefined,
    createAt: new Date(),
    updateAt: new Date(),
});


export const mockBranch = () => stubBranch(1);
export const mockBranches = () => [1, 2, 3, 4, 5].map(stubBranch);