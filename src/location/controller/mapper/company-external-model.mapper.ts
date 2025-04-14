import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalResponseDto } from "../dto/response/company-external.dto";

export class CompanyExternalModelMapper {
    public static toDTO(value: CompanyExternalConnectionModel): CompanyExternalResponseDto {
        return {
            companyId: value.companyId,
            companyExternalKey: value.companyExternalKey,
            companyExternalOwner: value.companyExternalOwner,
            corporativeId: value.corporativeId
        }
    }
}