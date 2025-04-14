import { Model } from "@shared/shared/domain/model";

export type BranchModelProps = {
    branchId: string;
    branchName: string;
    companyId: string;
    cityName: string;
}
export class BranchModel extends Model<BranchModelProps> {
    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }

    public get branchId(): Readonly<string> {
        return this.props.branchId;
    }

    public get branchName(): Readonly<string> {
        return this.props.branchName;
    }

    public get cityName(): Readonly<string> {
        return this.props.cityName;
    }
}