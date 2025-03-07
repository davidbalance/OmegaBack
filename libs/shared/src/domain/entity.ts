export type EntityProps = {
    id: string;
};

export abstract class Entity<T extends EntityProps> {
    private readonly _id: string;
    private readonly _props: T;

    protected constructor(props: T) {
        this._id = props.id;
        this._props = { ...props };
    }

    public get id(): string {
        return this._id;
    }

    protected get props(): T {
        return this._props;
    }

    protected updateProps(update: Partial<T>): void {
        Object.assign(this._props, update);
    }
}