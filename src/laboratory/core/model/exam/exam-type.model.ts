import { Model } from "@shared/shared/domain/model";

type ExamTypeModelProps = {
    typeId: string;
    typeName: string;
    hasSubtypes: boolean;
}
export class ExamTypeModel extends Model<ExamTypeModelProps> {
    public get typeId(): Readonly<string> {
        return this.props.typeId;
    }

    public get typeName(): Readonly<string> {
        return this.props.typeName;
    }

    public get hasSubtypes(): Readonly<boolean> {
        return this.props.hasSubtypes;
    }
}