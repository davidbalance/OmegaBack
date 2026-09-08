import { CompanyFilterModel } from "@omega/profile/core/model/user/company-filter.model";
import { CompanyFilterResponseDto } from "../dto/response/user-attribute.dto";

export class CompanyFilterModelMapper {
    public static toDTO(value: CompanyFilterModel): CompanyFilterResponseDto {
        return {
            id: value.id,
            companyId: value.companyId,
            companyRuc: value.companyRuc,
            corporativeId: value.corporativeId,
            corporativeName: value.corporativeName,
            userId: value.userId,
        }
    }
}