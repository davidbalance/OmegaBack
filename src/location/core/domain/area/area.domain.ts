import { CreateAreaPayload } from "./payloads/area.payloads";
import { AreaRemovedEvent, AreaRenamedEvent } from "./events/area.event";
import { AggregateProps, Aggregate } from "@shared/shared/domain";

export type AreaProps = AggregateProps & {
    name: string;
};
export class Area extends Aggregate<AreaProps> {

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateAreaPayload): Area {
        return new Area({
            id: crypto.randomUUID(),
            ...value
        });
    }

    public static rehydrate(props: AreaProps): Area {
        const value = new Area(props);
        value.commit();
        return value;
    }

    public rename(name: string): void {
        this.updateProps({ name });
        this.emit(new AreaRenamedEvent({
            areaId: this.id,
            areaName: name
        }))
    }

    public remove(): void {
        this.emit(new AreaRemovedEvent(this.id))
    }
}