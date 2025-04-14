import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

export type ExamSubtypeOption = Option & { children: Option[] };
type ExamSubtypeOptionModelProps = {
    subtypeValue: string;
    subtypeLabel: string;
    examValue: string;
    examLabel: string;
}
export class ExamSubtypeOptionModel extends Model<ExamSubtypeOptionModelProps> {
    public get subtypeValue(): Readonly<string> {
        return this.props.subtypeValue;
    }

    public get subtypeLabel(): Readonly<string> {
        return this.props.subtypeLabel;
    }

    public get examValue(): Readonly<string> {
        return this.props.examValue;
    }

    public get examLabel(): Readonly<string> {
        return this.props.examLabel;
    }
}