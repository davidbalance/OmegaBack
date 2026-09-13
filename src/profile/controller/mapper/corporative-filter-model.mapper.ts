import { CorporativeFilterModel } from "@omega/profile/core/model/user/corporative-filter.model";
import { CorporativeFilterResponseDto } from "../dto/response/user-attribute.dto";

export class CorporativeFilterModelMapper {
    public static toDTO(value: CorporativeFilterModel): CorporativeFilterResponseDto {
        return {
            id: value.id,
            corporativeId: value.corporativeId,
            corporativeName: value.corporativeName,
            userId: value.userId,
        }
    }
}