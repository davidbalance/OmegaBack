import { Model } from "@shared/shared/domain/model";

type ExamSubtypeModelProps = {
    subtypeId: string;
    subtypeName: string;
    hasExams: boolean;
    typeId: string;
}
export class ExamSubtypeModel extends Model<ExamSubtypeModelProps> {
    public get subtypeId(): Readonly<string> {
        return this.props.subtypeId;
    }

    public get subtypeName(): Readonly<string> {
        return this.props.subtypeName;
    }

    public get hasExams(): Readonly<boolean> {
        return this.props.hasExams;
    }

    public get typeId(): Readonly<string> {
        return this.props.typeId;
    }
}