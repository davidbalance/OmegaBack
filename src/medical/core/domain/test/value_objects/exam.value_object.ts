import { ValueObject } from "@shared/shared/domain";

type ExamValueObjectProps = {
    name: string;
    type: string;
    subtype: string;
}
export class ExamValueObject extends ValueObject<ExamValueObjectProps> {

    public get name(): Readonly<string> {
        return this._props.name;
    }

    public get type(): Readonly<string> {
        return this._props.type;
    }

    public get subtype(): Readonly<string> {
        return this._props.subtype;
    }

    public static create(value: ExamValueObjectProps): ExamValueObject {
        return new ExamValueObject(value);
    }

    protected isValid(): boolean {
        return true;
    }
}