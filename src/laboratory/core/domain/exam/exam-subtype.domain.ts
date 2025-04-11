import { Entity, EntityProps } from "@shared/shared/domain";
import { Exam } from "./exam.domain";
import { AddExamSubtypeExternalKeyPayload, AddExamToSubtypePayload, AddExternalKeyToExamPayload, CreateExamSubtypePayload, RenameExamFromSubtypePayload } from "./payloads/exam-subtype.payload";
import { ExamConflictError, ExamNotFoundError } from "./errors/exam.errors";
import { ExamSubtypeExternalKey } from "./value-objects/exam-subtype-external-key.value-object";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ExamSubtypeExternalKeyConflictError } from "./errors/exam-subtype-external-key.errors";

type ExamSubtypeProps = EntityProps & {
    typeId: string;
    exams: Exam[];
    name: string;
    externalKeys: ExamSubtypeExternalKey[];
};
export class ExamSubtype extends Entity<ExamSubtypeProps> {
    public get typeId(): Readonly<string> {
        return this.props.typeId;
    }

    public get exams(): ReadonlyArray<Exam> {
        return this.props.exams;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    get externalKeys(): ReadonlyArray<ExamSubtypeExternalKey> {
        return this.props.externalKeys;
    }

    private ensureUniqueExternalKey(key: ExternalKeyProps): void {
        if (this.props.externalKeys.some(e => e.owner === key.owner && e.value === key.value)) throw new ExamSubtypeExternalKeyConflictError(key.owner, key.value);
    }

    public static create(value: CreateExamSubtypePayload): ExamSubtype {
        return new ExamSubtype({
            ...value,
            id: crypto.randomUUID(),
            exams: [],
            externalKeys: [],
        });
    }

    public static rehydrate(props: ExamSubtypeProps): ExamSubtype {
        return new ExamSubtype(props);
    }

    public rename(name: string): void {
        this.updateProps({ name });
    }

    private ensureUniqueExamName(name: string): void {
        if (this.props.exams.some(x => x.name === name)) throw new ExamConflictError(name);
    }

    public addExam(value: AddExamToSubtypePayload): void {
        this.ensureUniqueExamName(value.examName);
        const exam = Exam.create({
            ...value,
            subtypeId: this.id,
            name: value.examName
        });
        this.updateProps({ exams: [...this.props.exams, exam] });
    }

    public removeExam(examId: string): void {
        const newExams = this.props.exams.filter(x => x.id !== examId);
        if (newExams.length === this.props.exams.length) throw new ExamNotFoundError(examId);

        this.updateProps({ exams: newExams });
    }

    public moveExamTo(target: ExamSubtype, examId: string): void {
        const examToMove = this.props.exams.find(e => e.id === examId);
        if (!examToMove) throw new ExamNotFoundError(examId);

        target.ensureUniqueExamName(examToMove.name);
        this.removeExam(examId);
        target.updateProps({ exams: [...target.exams, examToMove] });
    }

    public renameExam(value: RenameExamFromSubtypePayload): void {
        this.ensureUniqueExamName(value.examName);
        const examIndex = this.props.exams.findIndex(e => e.id === value.examId);
        if (examIndex < 0) throw new ExamNotFoundError(value.examId);

        const newExams = [...this.props.exams];
        newExams[examIndex] = Exam.rehydrate({
            id: newExams[examIndex].id,
            subtypeId: newExams[examIndex].subtypeId,
            name: value.examName,
            externalKeys: [...newExams[examIndex].externalKeys]
        });

        this.updateProps({ exams: newExams });
    }

    public addExternalKey(payload: AddExamSubtypeExternalKeyPayload): void {
        this.ensureUniqueExternalKey(payload);
        const newKey = ExamSubtypeExternalKey.create({ ...payload, subtypeExamId: this.id });
        const newExternalKeys = [...this.props.externalKeys, newKey];
        this.updateProps({ externalKeys: newExternalKeys });
    }

    public addExternalKeyToExam(payload: AddExternalKeyToExamPayload): void {
        const exam = this.props.exams.find(e => e.id === payload.examId);
        if(!exam) throw new ExamNotFoundError(payload.examId);
        exam.addExternalKey(payload);
    }
}