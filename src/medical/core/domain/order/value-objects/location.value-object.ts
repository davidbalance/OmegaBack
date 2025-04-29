import { ValueObject } from "@shared/shared/domain";

type LocationValueObjectProps = {
    corporativeName: string;
    companyRuc: string;
    companyName: string;
    branchName: string;
}
export class LocationValueObject extends ValueObject<LocationValueObjectProps> {
    public get corporativeName(): string {
        return this._props.corporativeName;
    }

    public get companyRuc(): string {
        return this._props.companyRuc;
    }

    public get companyName(): string {
        return this._props.companyName;
    }

    public get branchName(): string {
        return this._props.branchName;
    }

    public static create(value: LocationValueObjectProps): LocationValueObject {
        const location = new LocationValueObject(value);
        return location;
    }

    protected isValid(): boolean {
        return true;
    }

}