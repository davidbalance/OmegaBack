import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchResponseDto } from "../dto/response/branch.dto";

export class BranchModelMapper {
    public static toDTO(value: BranchModel): BranchResponseDto {
        return {
            branchId: value.branchId,
            branchName: value.branchName,
            cityName: value.cityName,
            companyId: value.companyId
        }
    }
}