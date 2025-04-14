import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeResponseDto } from "../dto/response/corporative.dto";

export class CorporativeModelMapper {
    public static toDTO(value: CorporativeModel): CorporativeResponseDto {
        return {
            corporativeId: value.corporativeId,
            corporativeName: value.corporativeName,
            hasCompanies: value.hasCompanies
        }
    }
}