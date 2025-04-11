import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type ExamSubtypeExternalKeyProps = ExternalKeyProps & {
    subtypeExamId: string;
}

export class ExamSubtypeExternalKey extends ExternalKey {
    private readonly _subtypeExamId: string;

    public get subtypeExamId(): Readonly<string> {
        return this._subtypeExamId;
    }

    protected constructor(props: ExamSubtypeExternalKeyProps) {
        super(props);
        this._subtypeExamId = props.subtypeExamId;
    }

    public static create(value: ExamSubtypeExternalKeyProps): ExamSubtypeExternalKey {
        return new ExamSubtypeExternalKey(value);
    }
}