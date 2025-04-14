import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";
import { ExamSubtypeOption } from "./exam-subtype-option.model";

export type ExamTypeOption = Option & { children: ExamSubtypeOption[] };
type ExamTypeOptionModelProps = {
    typeValue: string;
    typeLabel: string;
    subtypeValue: string;
    subtypeLabel: string;
}
export class ExamTypeOptionModel extends Model<ExamTypeOptionModelProps> {
    public get typeValue(): Readonly<string> {
        return this.props.typeValue;
    }

    public get typeLabel(): Readonly<string> {
        return this.props.typeLabel;
    }

    public get subtypeValue(): Readonly<string> {
        return this.props.subtypeValue;
    }

    public get subtypeLabel(): Readonly<string> {
        return this.props.subtypeLabel;
    }
}