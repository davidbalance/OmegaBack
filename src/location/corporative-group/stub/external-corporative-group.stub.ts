import { ExtendedCompany } from "@/location/company/dtos/response/extended-company.base.dto";
import { ExtendedCorporativeGroup } from "../dtos/response/extended-corporative-group.base.dto";
import { ExtendedBranch } from "@/location/branch/dtos/response/extended-branch.base.dto";

const stubExtendedBranch = (id: number): ExtendedBranch => ({
    id: id,
    name: "Stub branch",
    city: { id: 1, name: "Quito" }
});

const stubExtendedCompany = (id: number): ExtendedCompany => ({
    id: id,
    ruc: "0999999999001",
    name: "Stub company",
    address: "Stub address",
    phone: "0999999999",
    branches: Array(10).map(stubExtendedBranch),
})

const stubExternalCorporativeGroup = (id: number): ExtendedCorporativeGroup => ({
    id: id,
    name: "Stub corporative group",
    companies: Array(10).map(stubExtendedCompany),
});

export const mockExternalCorporativeGroup = () => stubExternalCorporativeGroup(1);
export const mockExternalCorporativeGroups = () => Array(20).map(stubExternalCorporativeGroup);