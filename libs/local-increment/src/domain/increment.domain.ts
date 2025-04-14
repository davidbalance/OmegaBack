import { Aggregate, AggregateProps } from "@shared/shared/domain";
import { IncrementNextEvent } from "../event/increment.event";

type IncrementProps = AggregateProps & {
    key: string;
    count: number;
}
export class IncrementDomain extends Aggregate<IncrementProps> {
    public get key(): Readonly<string> {
        return this.props.key;
    }
    public get count(): Readonly<number> {
        return this.props.count;
    }

    public static create(key: string): IncrementDomain {
        const value = new IncrementDomain({
            id: crypto.randomUUID(),
            key: key,
            count: 0
        });
        return value;
    }

    public static rehydrate(props: IncrementProps): IncrementDomain {
        const value = new IncrementDomain(props);
        value.commit();
        return value;
    }

    public next(): number {
        const newValue = this.props.count + 1;
        this.updateProps({ count: newValue });
        this.emit(new IncrementNextEvent({ incrementId: this.id, incrementCount: newValue }));
        return newValue;
    }
}