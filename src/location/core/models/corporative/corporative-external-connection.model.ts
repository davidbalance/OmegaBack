import { Model } from "@shared/shared/domain/model";

export type CorporativeExternalConnectionModelProps = {
    corporativeId: string;
    corporativeExternalKey: string;
    corporativeExternalOwner: string;
}
export class CorporativeExternalConnectionModel extends Model<CorporativeExternalConnectionModelProps> {
    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get corporativeExternalKey(): Readonly<string> {
        return this.props.corporativeExternalKey;
    }

    public get corporativeExternalOwner(): Readonly<string> {
        return this.props.corporativeExternalOwner;
    }
}