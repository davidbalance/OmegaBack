import { EntityProps, Entity } from "@shared/shared/domain";
import { CreateBranchPayload } from "./payloads/branch.payloads";

type BranchProps = EntityProps & {
    companyId: string;
    cityId: number;
    name: string;
};
export class Branch extends Entity<BranchProps> {
    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }

    public get cityId(): Readonly<number> {
        return this.props.cityId;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateBranchPayload): Branch {
        return new Branch({ id: crypto.randomUUID(), ...value });
    }

    public static rehydrate(props: BranchProps): Branch {
        return new Branch(props);
    }

    public rename(name: string): void {
        this.updateProps({ name });
    }
}