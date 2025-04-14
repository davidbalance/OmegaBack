import { Entity, EntityProps } from "@shared/shared/domain";
import { Branch } from "./branch.domain";
import { RucValueObject } from "./value_objects/ruc.value_object";
import { AddBranchExternalKeyFromCompanyPayload, AddBranchToCompanyPayload, AddCompanyExternalKeyPayload, CreateCompanyPayload } from "./payloads/company.payloads";
import { BranchConflictError, BranchNotFoundError } from "./errors/branch.errors";
import { CompanyExternalKey } from "./value_objects/company-external-key.value-object";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { CompanyExternalKeyConflictError } from "./errors/company-external-key.errors";

type CompanyProps = EntityProps & {
    corporativeId: string;
    branches: Branch[];
    name: string;
    ruc: RucValueObject;
    address: string;
    phone: string;
    externalKeys: CompanyExternalKey[];
};
export class Company extends Entity<CompanyProps> {
    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get branches(): ReadonlyArray<Branch> {
        return this.props.branches;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public get ruc(): Readonly<string> {
        return this.props.ruc.ruc;
    }

    public get address(): Readonly<string> {
        return this.props.address;
    }

    public get phone(): Readonly<string> {
        return this.props.phone;
    }

    public get externalKeys(): ReadonlyArray<CompanyExternalKey> {
        return this.props.externalKeys;
    }

    private ensureUniqueExternalKey(key: ExternalKeyProps): void {
        if (this.props.externalKeys.some(e => e.owner === key.owner && e.value === key.value)) throw new CompanyExternalKeyConflictError(key.owner, key.value);
    }

    private ensureUniqueBranchName(name: string): void {
        if (this.props.branches.some(x => x.name === name))
            throw new BranchConflictError(name);
    }

    public static create(value: CreateCompanyPayload): Company {
        const ruc = RucValueObject.create({ ruc: value.ruc });
        return new Company({
            ...value,
            id: crypto.randomUUID(),
            branches: [],
            ruc,
            externalKeys: []
        });
    }

    public static rehydrate(props: Omit<CompanyProps, 'ruc'> & { ruc: string }): Company {
        const ruc = RucValueObject.create({ ruc: props.ruc });
        return new Company({
            ...props,
            ruc
        });
    }

    public addBranch(value: AddBranchToCompanyPayload): void {
        this.ensureUniqueBranchName(value.name);
        const newBranch = Branch.create({
            companyId: this.id,
            ...value,
        });

        this.updateProps({ branches: [...this.props.branches, newBranch] });
    }

    public removeBranch(branchId: string): void {
        const newBranches = this.props.branches.filter(x => x.id !== branchId);
        if (newBranches.length === this.props.branches.length)
            throw new BranchNotFoundError(branchId);

        this.updateProps({ branches: newBranches });
    }

    public moveBranchTo(target: Company, branchId: string): void {
        const branchToMove = this.props.branches.find(x => x.id === branchId);
        if (!branchToMove)
            throw new BranchNotFoundError(branchId);

        target.ensureUniqueBranchName(branchToMove.name);

        this.removeBranch(branchId);
        target.updateProps({ branches: [...target.branches, branchToMove] });
    }

    public addExternalKey(payload: AddCompanyExternalKeyPayload): void {
        this.ensureUniqueExternalKey(payload);
        const newKey = CompanyExternalKey.create({ ...payload, companyId: this.id });
        const newExternalKeys = [...this.props.externalKeys, newKey];
        this.updateProps({ externalKeys: newExternalKeys });
    }

    public addExternalKeyToBranch(payload: AddBranchExternalKeyFromCompanyPayload): void {
        const branch = this.props.branches.find(e => e.id === payload.branchId);
        if (!branch) throw new BranchNotFoundError(payload.branchId);
        branch.addExternalKey(payload);
    }
}