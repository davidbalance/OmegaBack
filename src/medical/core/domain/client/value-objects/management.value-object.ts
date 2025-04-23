import { ValueObject } from "@shared/shared/domain";

type ManagementValueObjectProps = {
    id: string;
    name: string;
}
export class ManagementValueObject extends ValueObject<ManagementValueObjectProps> {
    public get id(): Readonly<string> {
        return this._props.id;
    }

    public get name(): Readonly<string> {
        return this._props.name;
    }

    public static create(value: ManagementValueObjectProps): ManagementValueObject {
        const management = new ManagementValueObject(value);
        return management;
    }

    protected isValid(): boolean {
        throw new Error("Method not implemented.");
    }
}