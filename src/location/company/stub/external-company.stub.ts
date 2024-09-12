import { ExtendedCompany } from "../dtos/response/extended-company.base.dto";
import { ExtendedBranch } from "@/location/branch/dtos/response/extended-branch.base.dto";

const stubBranch = (id: number): ExtendedBranch => ({
    city: { id: 1, name: 'Quito' },
    id: id,
    name: "Stub branch"
});

const stubExtendedCompany = (id: number): ExtendedCompany => ({
    id: 1,
    ruc: "1234567890",
    name: "my-stub-name",
    address: "my-stub-address",
    phone: "my-stub-phone",
    branches: Array(10).map(stubBranch)
});


export const mockExternalCompany = () => stubExtendedCompany(1);
export const mockExternalCompanies = () => Array(20).map(stubExtendedCompany);