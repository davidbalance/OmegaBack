import { Model } from "@shared/shared/domain/model";

type ExamTypeExternalConnectionModelProps = {
    typeId: string;
    typeExternalKey: string;
    typeExternalOwner: string;
}
export class ExamTypeExternalConnectionModel extends Model<ExamTypeExternalConnectionModelProps> {
    public get typeId(): Readonly<string> {
        return this.props.typeId;
    }

    public get typeExternalKey(): Readonly<string> {
        return this.props.typeExternalKey;
    }

    public get typeExternalOwner(): Readonly<string> {
        return this.props.typeExternalOwner;
    }
}