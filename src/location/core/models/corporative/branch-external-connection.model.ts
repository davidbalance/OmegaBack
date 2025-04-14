import { Model } from "@shared/shared/domain/model";

export type BranchExternalConnectionModelProps = {
    branchId: string;
    branchExternalKey: string;
    branchExternalOwner: string;
    companyId: string;
}
export class BranchExternalConnectionModel extends Model<BranchExternalConnectionModelProps> {
    public get branchId(): Readonly<string> {
        return this.props.branchId;
    }

    public get branchExternalKey(): Readonly<string> {
        return this.props.branchExternalKey;
    }

    public get branchExternalOwner(): Readonly<string> {
        return this.props.branchExternalOwner;
    }

    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }
}