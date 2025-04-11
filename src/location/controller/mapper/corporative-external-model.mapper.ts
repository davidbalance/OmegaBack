import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalResponseDto } from "../dto/response/corporative-external.dto";

export class CorporativeExternalModelMapper {
    public static toDTO(value: CorporativeExternalConnectionModel): CorporativeExternalResponseDto {
        return {
            corporativeExternalKey: value.corporativeExternalKey,
            corporativeExternalOwner: value.corporativeExternalOwner,
            corporativeId: value.corporativeId
        }
    }
}