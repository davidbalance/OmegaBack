import { Model } from "@shared/shared/domain/model";

export type CompanyExternalConnectionModelProps = {
    companyId: string;
    companyExternalKey: string;
    companyExternalOwner: string;
    corporativeId: string;
}
export class CompanyExternalConnectionModel extends Model<CompanyExternalConnectionModelProps> {
    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }

    public get companyExternalKey(): Readonly<string> {
        return this.props.companyExternalKey;
    }

    public get companyExternalOwner(): Readonly<string> {
        return this.props.companyExternalOwner;
    }

    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }
}