import { BranchEntity } from "@/location/branch/entities/branch.entity";
import { CityEntity } from "@/location/city/entities/city.entity";
import { CompanyEntity } from "@/location/company/entities/company.entity";
import { ExtendedBranch } from "../dtos/response/extended-branch.base.dto";

const stubExtendedBranch = (id: number): ExtendedBranch => ({
    id: id,
    name: "Stub branch",
    city: { 
        id: 1,
        name: 'Stub branch'
    }
});


export const mockExternalBranch = () => stubExtendedBranch(1);
export const mockExternalBranches = () => [1, 2, 3, 4, 5].map(stubExtendedBranch);