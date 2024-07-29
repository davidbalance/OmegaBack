import { CompanyExternalKey } from "@/location/company/entities/company-external-key.entity";

const stubCompanyExternalKey = (id: number): CompanyExternalKey => ({
    id: 1,
    source: "my-stub-source",
    key: "my-stub-key",
    createAt: new Date(),
    updateAt: new Date()
});


export const mockCompanyExternalKey = () => stubCompanyExternalKey(1);