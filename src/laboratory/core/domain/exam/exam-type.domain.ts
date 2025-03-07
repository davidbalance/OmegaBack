import { ExamSubtype } from "./exam-subtype.domain";
import { AddExamFromTypePayload, AddSubtypeToTypePayload, CreateExamTypePayload, MoveExamPayload, RemoveExamFromTypePayload, RenameExamFromTypePayload, RenameSubtypeFromTypePayload } from "./payloads/exam-type.payload";
import { ExamTypeSubtypeMovedEvent, ExamTypeRenamedEvent, ExamTypeSubtypeAddedEvent, ExamTypeSubtypeRemovedEvent, ExamTypeRemovedEvent } from "./events/exam-type.events";
import { ExamSubtypeExamAddedEvent, ExamSubtypeExamMovedEvent, ExamSubtypeExamRemovedEvent, ExamSubtypeRenamedEvent } from "./events/exam-subtype.events";
import { ExamRenamedEvent } from "./events/exam.events";
import { ExamTypeInvalidError } from "./errors/exam-type.errors";
import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { ExamSubtypeConflictError, ExamSubtypeNotFoundError } from "./errors/exam-subtype.errors";

export type ExamTypeProps = AggregateProps & {
    subtypes: ExamSubtype[];
    name: string;
};
export class ExamType extends Aggregate<ExamTypeProps> {
    public get subtypes(): ReadonlyArray<ExamSubtype> {
        return this.props.subtypes;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateExamTypePayload): ExamType {
        return new ExamType({
            id: crypto.randomUUID(),
            subtypes: [],
            ...value
        });
    }

    public static rehydrate(props: ExamTypeProps): ExamType {
        const type = new ExamType(props);
        type.commit();
        return type;
    }

    private ensureUniqueSubtypeName(name: string): void {
        if (this.props.subtypes.some(x => x.name === name)) throw new ExamSubtypeConflictError(name);
    }

    public rename(name: string): void {
        this.updateProps({ name });
        this.emit(new ExamTypeRenamedEvent({
            typeId: this.id,
            name: name
        }));
    }

    public remove(): void {
        if (this.subtypes.length) throw new ExamTypeInvalidError('REMOVE');
        this.emit(new ExamTypeRemovedEvent(this.id));
    }

    public addSubtype(value: AddSubtypeToTypePayload): void {
        this.ensureUniqueSubtypeName(value.subtypeName);
        const newSubtype = ExamSubtype.create({
            ...value,
            typeId: this.id,
            name: value.subtypeName
        });

        this.updateProps({ subtypes: [...this.props.subtypes, newSubtype] });
        this.emit(new ExamTypeSubtypeAddedEvent(newSubtype));
    }

    public removeSubtype(subtypeId: string): void {
        if (this.props.subtypes.some(x => x.id === subtypeId && x.exams.length))
            throw new ExamSubtypeConflictError(subtypeId);

        this.forceRemoveSubtype(subtypeId);

        this.emit(new ExamTypeSubtypeRemovedEvent(subtypeId));
    }

    private forceRemoveSubtype(subtypeId: string): void {
        const newSubtypes = this.props.subtypes.filter(x => x.id !== subtypeId);
        if (newSubtypes.length === this.props.subtypes.length) throw new ExamSubtypeNotFoundError(subtypeId);

        this.updateProps({ subtypes: newSubtypes });
    }

    public renameSubtype(value: RenameSubtypeFromTypePayload): void {
        this.ensureUniqueSubtypeName(value.subtypeName);
        const subtypeIndex = this.props.subtypes.findIndex(e => e.id === value.subtypeId);
        if (subtypeIndex < 0) throw new ExamSubtypeNotFoundError(value.subtypeId);

        const newSubtype = [...this.props.subtypes];
        newSubtype[subtypeIndex] = ExamSubtype.rehydrate({
            id: newSubtype[subtypeIndex].id,
            typeId: newSubtype[subtypeIndex].typeId,
            exams: [...newSubtype[subtypeIndex].exams],
            name: value.subtypeName
        });
        this.updateProps({ subtypes: newSubtype });
        this.emit(new ExamSubtypeRenamedEvent(value));
    }

    public moveSubtypeTo(target: ExamType, subtypeId: string): void {
        const subtypeToMove = this.props.subtypes.find(e => e.id === subtypeId);
        if (!subtypeToMove) throw new ExamSubtypeNotFoundError(subtypeId);

        target.ensureUniqueSubtypeName(subtypeToMove.name);

        this.forceRemoveSubtype(subtypeId);
        target.updateProps({ subtypes: [...target.subtypes, subtypeToMove] });
        this.emit(new ExamTypeSubtypeMovedEvent({
            fromExamType: this.id,
            toExamType: target.id,
            subtypeId: subtypeId
        }));
    }

    public addExamToSubtype(value: AddExamFromTypePayload): void {
        const subtypeIndex = this.props.subtypes.findIndex(x => x.id === value.subtypeId);
        if (subtypeIndex < 0) throw new ExamSubtypeNotFoundError(value.subtypeId);

        const newSubtypes = [...this.props.subtypes];
        newSubtypes[subtypeIndex].addExam({ examName: value.examName });

        this.updateProps({ subtypes: newSubtypes });
        this.emit(new ExamSubtypeExamAddedEvent(newSubtypes[subtypeIndex].exams[0]));
    }

    public removeExamFromSubtype(value: RemoveExamFromTypePayload): void {
        const subtypeIndex = this.props.subtypes.findIndex(x => x.id === value.subtypeId);
        if (subtypeIndex < 0) throw new ExamSubtypeNotFoundError(value.subtypeId);

        const newSubtypes = [...this.props.subtypes];
        newSubtypes[subtypeIndex].removeExam(value.examId);

        this.updateProps({ subtypes: newSubtypes });
        this.emit(new ExamSubtypeExamRemovedEvent(value.examId));
    }

    public moveExamTo(target: ExamType, payload: MoveExamPayload): void {
        const fromSubtype = this.props.subtypes.find(e => e.id === payload.fromSubtypeId);
        if (!fromSubtype) throw new ExamSubtypeNotFoundError(payload.fromSubtypeId);

        const toSubtype = target.subtypes.find(e => e.id === payload.toSubtypeId);
        if (!toSubtype) throw new ExamSubtypeNotFoundError(payload.toSubtypeId);

        fromSubtype.moveExamTo(toSubtype, payload.examId)

        this.emit(new ExamSubtypeExamMovedEvent({
            examId: payload.examId,
            fromSubtypeId: fromSubtype.id,
            fromTypeId: this.id,
            toSubtypeId: toSubtype.id,
            toTypeId: target.id
        }));
    }

    public renameExamInSubtype(value: RenameExamFromTypePayload): void {
        const subtypeIndex = this.props.subtypes.findIndex(e => e.id === value.subtypeId);
        if (subtypeIndex < 0) throw new ExamSubtypeNotFoundError(value.subtypeId);

        const newSubtypes = [...this.props.subtypes];
        newSubtypes[subtypeIndex].renameExam(value);

        this.updateProps({ subtypes: newSubtypes });
        this.emit(new ExamRenamedEvent(value));
    }
}