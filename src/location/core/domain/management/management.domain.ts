import { CreateManagementPayload } from "./payloads/management.payloads";
import { ManagementRemovedEvent, ManagementRenamedEvent } from "./events/management.event";
import { AggregateProps, Aggregate } from "@shared/shared/domain";

export type ManagementProps = AggregateProps & {
    name: string;
};
export class Management extends Aggregate<ManagementProps> {

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateManagementPayload): Management {
        return new Management({
            id: crypto.randomUUID(),
            ...value
        });
    }

    public static rehydrate(props: ManagementProps): Management {
        const value = new Management(props);
        value.commit();
        return value;
    }

    public rename(name: string): void {
        this.updateProps({ name });
        this.emit(new ManagementRenamedEvent({
            managementId: this.id,
            managementName: name
        }))
    }

    public remove(): void {
        this.emit(new ManagementRemovedEvent(this.id));
    }
}