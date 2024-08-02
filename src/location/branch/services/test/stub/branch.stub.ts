import { Branch } from "@/location/branch/entities/branch.entity";
import { City } from "@/location/city/entities/city.entity";
import { Company } from "@/location/company/entities/company.entity";

const stubBranch = (id: number): Branch => ({
    id: id,
    name: "my-stub-name",
    status: true,
    company: {} as Company,
    city: {} as City,
    externalKey: undefined,
    createAt: new Date(),
    updateAt: new Date(),
});


export const mockBranch = () => stubBranch(1);
export const mockBranches = () => [1, 2, 3, 4, 5].map(stubBranch);