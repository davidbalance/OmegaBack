import { Model } from "@shared/shared/domain/model";

type ExamSubtypeExternalConnectionModelProps = {
    subtypeId: string;
    subtypeExternalKey: string;
    subtypeExternalOwner: string;
    typeId: string;
}
export class ExamSubtypeExternalConnectionModel extends Model<ExamSubtypeExternalConnectionModelProps> {
    public get subtypeId(): Readonly<string> {
        return this.props.subtypeId;
    }

    public get subtypeExternalKey(): Readonly<string> {
        return this.props.subtypeExternalKey;
    }

    public get subtypeExternalOwner(): Readonly<string> {
        return this.props.subtypeExternalOwner;
    }

    public get typeId(): Readonly<string> {
        return this.props.typeId;
    }
}