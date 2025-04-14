import { EntityProps, Entity } from "@shared/shared/domain";
import { AddBranchExternalKeyPayload, CreateBranchPayload } from "./payloads/branch.payloads";
import { BranchExternalKey } from "./value_objects/branch-external-key.value-object";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { BranchExternalKeyConflictError } from "./errors/branch-external-key.errors";

type BranchProps = EntityProps & {
    companyId: string;
    cityId: number;
    name: string;
    externalKeys: BranchExternalKey[];
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

    public get externalKeys(): ReadonlyArray<BranchExternalKey> {
        return this.props.externalKeys;
    }

    private ensureUniqueExternalKey(key: ExternalKeyProps): void {
        if (this.props.externalKeys.some(e => e.owner === key.owner && e.value === key.value)) throw new BranchExternalKeyConflictError(key.owner, key.value);
    }

    public static create(value: CreateBranchPayload): Branch {
        return new Branch({
            ...value,
            id: crypto.randomUUID(),
            externalKeys: []
        });
    }

    public static rehydrate(props: BranchProps): Branch {
        return new Branch(props);
    }

    public rename(name: string): void {
        this.updateProps({ name });
    }

    public addExternalKey(payload: AddBranchExternalKeyPayload): void {
        this.ensureUniqueExternalKey(payload);
        const newKey = BranchExternalKey.create({ ...payload, branchId: this.id });
        const newExternalKeys = [...this.props.externalKeys, newKey];
        this.updateProps({ externalKeys: newExternalKeys });
    }
}