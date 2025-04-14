import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type ExamExternalKeyProps = ExternalKeyProps & {
    examId: string;
}

export class ExamExternalKey extends ExternalKey {
    private readonly _examId: string;

    public get examId(): Readonly<string> {
        return this._examId;
    }

    protected constructor(props: ExamExternalKeyProps) {
        super(props);
        this._examId = props.examId;
    }

    public static create(value: ExamExternalKeyProps): ExamExternalKey {
        return new ExamExternalKey(value);
    }
}