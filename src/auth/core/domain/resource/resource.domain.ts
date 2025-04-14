import { Aggregate, AggregateProps } from "@shared/shared/domain";
import { CreateResourcePayload, EditResourcePayload } from "./payloads/resource.payload";
import { ResourceEditedEvent, ResourceRemovedEvent } from "./events/resource.events";
import { ResourceBadRequest } from "./errors/resource.errors";

export type ResourceProps = AggregateProps & {
    label: string;
    address: string;
    order: number;
    icon: string;
    hidden: boolean;
}
export class Resource extends Aggregate<ResourceProps> {
    public get label(): Readonly<string> {
        return this.props.label;
    }

    public get address(): Readonly<string> {
        return this.props.address;
    }

    public get order(): Readonly<number> {
        return this.props.order;
    }

    public get icon(): Readonly<string> {
        return this.props.icon;
    }

    public get hidden(): Readonly<boolean> {
        return this.props.hidden;
    }

    public static create(payload: CreateResourcePayload): Resource {
        if (payload.order < 0) throw new ResourceBadRequest();
        return new Resource({
            ...payload,
            id: crypto.randomUUID(),
            hidden: false
        });
    }

    public static rehydrate(props: ResourceProps): Resource {
        const data = new Resource(props);
        data.commit();
        return data;
    }

    public edit(payload: EditResourcePayload): void {
        if (payload.order && payload.order >= 0) throw new ResourceBadRequest();
        this.updateProps({ ...payload });
        this.emit(new ResourceEditedEvent(this));
    }

    public remove(): void {
        this.emit(new ResourceRemovedEvent(this.id));
    }

}