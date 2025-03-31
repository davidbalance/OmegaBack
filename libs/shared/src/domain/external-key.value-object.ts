import { ValueObject } from "./value-object";

export type ExternalKeyProps = {
    owner: string;
    value: string;
}

export abstract class ExternalKey extends ValueObject<ExternalKeyProps> {
    public get owner(): Readonly<string> {
        return this._props.owner;
    }

    public get value(): Readonly<string> {
        return this._props.value;
    }

    protected isValid(): boolean {
        return true;
    }
}