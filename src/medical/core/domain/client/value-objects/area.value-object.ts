import { ValueObject } from "@shared/shared/domain";

type AreaValueObjectProps = {
    id: string;
    name: string;
}
export class AreaValueObject extends ValueObject<AreaValueObjectProps> {
    public get id(): Readonly<string> {
        return this._props.id;
    }

    public get name(): Readonly<string> {
        return this._props.name;
    }

    public static create(value: AreaValueObjectProps): AreaValueObject {
        const area = new AreaValueObject(value);
        return area;
    }

    protected isValid(): boolean {
        throw new Error("Method not implemented.");
    }
}