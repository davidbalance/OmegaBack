export type ModelProps = object;
export class Model<T extends ModelProps> {
    protected get props(): Readonly<T> {
        return this._props;
    }

    constructor(private readonly _props: T) { }
}