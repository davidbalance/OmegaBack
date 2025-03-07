import { CreateJobPositionPayload } from "./payloads/job-position.payloads";
import { JobPositionRemovedEvent, JobPositionRenamedEvent } from "./events/job-position.event";
import { Aggregate, AggregateProps } from "@shared/shared/domain/aggregate";

export type JobPositionProps = AggregateProps & {
    name: string;
};
export class JobPosition extends Aggregate<JobPositionProps> {

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateJobPositionPayload): JobPosition {
        return new JobPosition({
            id: crypto.randomUUID(),
            ...value
        });
    }

    public static rehydrate(props: JobPositionProps): JobPosition {
        const value = new JobPosition(props);
        value.commit();
        return value;
    }

    public rename(name: string): void {
        this.updateProps({ name });
        this.emit(new JobPositionRenamedEvent({
            jobPositionId: this.id,
            jobPositionName: name
        }))
    }

    public remove(): void {
        this.emit(new JobPositionRemovedEvent(this.id))
    }
}