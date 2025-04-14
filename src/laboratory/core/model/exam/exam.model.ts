import { Model } from "@shared/shared/domain/model";

type ExamModelProps = {
    examId: string;
    examName: string;
    subtypeId: string;
}
export class ExamModel extends Model<ExamModelProps> {
    public get examId(): Readonly<string> {
        return this.props.examId;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }

    public get subtypeId(): Readonly<string> {
        return this.props.subtypeId;
    }
}