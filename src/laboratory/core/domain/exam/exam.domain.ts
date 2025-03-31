import { Entity, EntityProps } from "@shared/shared/domain";
import { AddExamExternalKeyPayload, CreateExamPayload } from "./payloads/exam.payloads";
import { ExamExternalKey } from "./value-objects/exam-external-key.value-object";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamExternalKeyConflictError } from "./errors/exam-external-key.errors";

export type ExamProps = EntityProps & {
    subtypeId: string;
    name: string;
    externalKeys: ExamExternalKey[];
};
export class Exam extends Entity<ExamProps> {

    get subtypeId(): Readonly<string> {
        return this.props.subtypeId;
    }

    get name(): Readonly<string> {
        return this.props.name;
    }

    get externalKeys(): ReadonlyArray<ExamExternalKey> {
        return this.props.externalKeys;
    }

    private ensureUniqueExternalKey(key: ExternalKeyProps): void {
        if (this.props.externalKeys.some(e => e.owner === key.owner && e.value === key.value)) throw new ExamExternalKeyConflictError(key.owner, key.value);
    }


    public static create(value: CreateExamPayload): Exam {
        return new Exam({
            ...value,
            id: crypto.randomUUID(),
            externalKeys: []
        });
    }

    public static rehydrate(props: ExamProps): Exam {
        return new Exam(props);
    }

    public rename(name: string): void {
        this.updateProps({ name });
    }

    public addExternalKey(payload: AddExamExternalKeyPayload): void {
        this.ensureUniqueExternalKey(payload);
        const newKey = ExamExternalKey.create({ ...payload, examId: this.id });
        const newExternalKeys = [...this.props.externalKeys, newKey];
        this.updateProps({ externalKeys: newExternalKeys });
    }
}