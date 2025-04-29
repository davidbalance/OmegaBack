import { ValueObject } from "@shared/shared/domain";
import { DniInvalidValueError } from "../errors/dni.errors";

type DniValueObjectProps = {
    dni: string;
}
export class DniValueObject extends ValueObject<DniValueObjectProps> {

    public get dni(): Readonly<string> {
        return this._props.dni;
    }

    public static create(value: DniValueObjectProps): DniValueObject {
        const ruc = new DniValueObject(value);
        if (!ruc.isValid())
            throw new DniInvalidValueError(value.dni);
        return ruc;
    }

    protected isValid(): boolean {
        // return this._props.dni.length === 10 && /^[0-9]*$/.test(this._props.dni);
        return this._props.dni.length >= 9
    }
}