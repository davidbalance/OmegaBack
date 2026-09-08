import { Model } from "@shared/shared/domain/model";

type CompanyFilterModelProps = {
    id: string;
    companyId: string;
    companyRuc: string;
    corporativeId: string;
    corporativeName: string;
    userId: string;
}

export class CompanyFilterModel extends Model<CompanyFilterModelProps> {
    public get id(): Readonly<string> {
        return this.props.id;
    }

    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }

    public get companyRuc(): Readonly<string> {
        return this.props.companyRuc;
    }

    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get corporativeName(): Readonly<string> {
        return this.props.corporativeName;
    }

    public get userId(): Readonly<string> {
        return this.props.userId;
    }
}