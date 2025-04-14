import { Model } from "@shared/shared/domain/model";

type ExamExternalConnectionModelProps = {
    examId: string;
    examExternalKey: string;
    examExternalOwner: string;
    subtypeId: string;
}
export class ExamExternalConnectionModel extends Model<ExamExternalConnectionModelProps> {
    public get examId(): Readonly<string> {
        return this.props.examId;
    }

    public get examExternalKey(): Readonly<string> {
        return this.props.examExternalKey;
    }

    public get examExternalOwner(): Readonly<string> {
        return this.props.examExternalOwner;
    }

    public get subtypeId(): Readonly<string> {
        return this.props.subtypeId;
    }
}