export abstract class DomainEvent<T> {
    private readonly _key: string;
    private readonly _value: T;

    constructor(props: { key: string; value: T }) {
        this._key = props.key;
        this._value = props.value;
    }

    public get key(): string {
        return this._key;
    }

    public get value(): T {
        return this._value;
    }
}