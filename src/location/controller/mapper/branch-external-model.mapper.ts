import { BranchExternalResponseDto } from "../dto/response/branch-external.dto";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";

export class BranchExternalModelMapper {
    public static toDTO(value: BranchExternalConnectionModel): BranchExternalResponseDto {
        return {
            branchExternalKey: value.branchExternalKey,
            branchExternalOwner: value.branchExternalOwner,
            branchId: value.branchId,
            companyId: value.companyId,
        }
    }
}