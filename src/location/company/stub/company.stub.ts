import { Company } from "../dtos/response/company.base.dto";

const stubCompany = (id: number): Company => ({
    id: id,
    ruc: "1234567890",
    name: "Stub name",
    address: "Stub address",
    phone: "0999999999",
});

export const mockCompany = () => stubCompany(1);
export const mockCompanies = () => [1, 2, 3, 4, 5].map(stubCompany);