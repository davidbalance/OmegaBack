import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyResponseDto } from "../dto/response/company.dto";

export class CompanyModelMapper {
    public static toDTO(value: CompanyModel): CompanyResponseDto {
        return {
            companyId: value.companyId,
            companyAddress: value.companyAddress,
            companyName: value.companyName,
            companyPhone: value.companyPhone,
            companyRuc: value.companyRuc,
            corporativeId: value.corporativeId,
            hasBranches: value.hasBranches
        }
    }
}