import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateExamPayload } from "./payloads/exam.payloads";

export type ExamProps = EntityProps & {
    subtypeId: string;
    name: string;
};
export class Exam extends Entity<ExamProps> {

    get subtypeId(): Readonly<string> {
        return this.props.subtypeId;
    }

    get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateExamPayload): Exam {
        return new Exam({ id: crypto.randomUUID(), ...value });
    }

    public static rehydrate(props: ExamProps): Exam {
        return new Exam(props);
    }

    public rename(name: string): void {
        this.updateProps({ name });
    }
}