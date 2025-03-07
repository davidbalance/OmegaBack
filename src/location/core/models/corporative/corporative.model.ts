import { Model } from "@shared/shared/domain/model";

export type CorporativeModelProps = {
    corporativeId: string;
    corporativeName: string;
    hasCompanies: boolean;
}
export class CorporativeModel extends Model<CorporativeModelProps> {
    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get corporativeName(): Readonly<string> {
        return this.props.corporativeName;
    }

    public get hasCompanies(): Readonly<boolean> {
        return this.props.hasCompanies;
    }
}