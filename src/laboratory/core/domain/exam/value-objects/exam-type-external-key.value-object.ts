import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type ExamTypeExternalKeyProps = ExternalKeyProps & {
    typeExamId: string;
}

export class ExamTypeExternalKey extends ExternalKey {
    private readonly _typeExamId: string;

    public get typeExamId(): Readonly<string> {
        return this._typeExamId;
    }

    protected constructor(props: ExamTypeExternalKeyProps) {
        super(props);
        this._typeExamId = props.typeExamId;
    }

    public static create(value: ExamTypeExternalKeyProps): ExamTypeExternalKey {
        return new ExamTypeExternalKey(value);
    }
}