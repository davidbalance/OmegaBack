import { Model } from "@shared/shared/domain/model";

export type CompanyModelProps = {
    corporativeId: string;
    companyId: string;
    companyRuc: string;
    companyName: string;
    companyAddress: string;
    hasBranches: boolean;
    companyPhone: string;
}
export class CompanyModel extends Model<CompanyModelProps> {
    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }

    public get companyRuc(): Readonly<string> {
        return this.props.companyRuc;
    }

    public get companyName(): Readonly<string> {
        return this.props.companyName;
    }

    public get companyAddress(): Readonly<string> {
        return this.props.companyAddress;
    }

    public get companyPhone(): Readonly<string> {
        return this.props.companyPhone;
    }

    public get hasBranches(): Readonly<boolean> {
        return this.props.hasBranches;
    }
}