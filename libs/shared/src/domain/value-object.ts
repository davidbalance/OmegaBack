export abstract class ValueObject<T> {
    protected _props: Readonly<T>;

    protected constructor(props: T) {
        this._props = props;
    }

    protected abstract isValid(): boolean;
}