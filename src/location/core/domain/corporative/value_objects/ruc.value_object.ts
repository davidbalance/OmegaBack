import { ValueObject } from "@shared/shared/domain";
import { CompanyBadRequestError } from "../errors/company.errors";

type RucValueObjectProps = {
    ruc: string;
}
export class RucValueObject extends ValueObject<RucValueObjectProps> {

    public get ruc(): Readonly<string> {
        return this._props.ruc;
    }

    public static create(value: RucValueObjectProps): RucValueObject {
        const ruc = new RucValueObject(value);
        if (!ruc.isValid()) throw new CompanyBadRequestError(`ruc=${value.ruc}`);
        return ruc;
    }

    protected isValid(): boolean {
        return this._props.ruc.length === 13 && /^[0-9]*$/.test(this._props.ruc);
    }
}