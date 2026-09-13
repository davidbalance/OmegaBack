import { Model } from "@shared/shared/domain/model";

type CorporativeFilterModelProps = {
    id: string;
    corporativeId: string;
    corporativeName: string;
    userId: string;
}

export class CorporativeFilterModel extends Model<CorporativeFilterModelProps> {
    public get id(): Readonly<string> {
        return this.props.id;
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