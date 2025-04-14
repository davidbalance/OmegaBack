import { ValueObject } from "@shared/shared/domain";

type DoctorValueObjectProps = {
    dni: string;
    fullname: string;
    signature: string;
}
export class DoctorValueObject extends ValueObject<DoctorValueObjectProps> {
    public get dni(): string {
        return this._props.dni;
    }

    public get fullname(): string {
        return this._props.fullname;
    }

    public get signature(): string {
        return this._props.signature;
    }

    public static create(value: DoctorValueObjectProps): DoctorValueObject {
        const doctor = new DoctorValueObject(value);
        return doctor;
    }

    protected isValid(): boolean {
        return true;
    }

}