import { Company } from "./company.domain";
import { AddBranchToCorporativePayload, AddCompanyToCorporativePayload, CreateCorporativePayload, MoveBranchPayload, RemoveBranchFromCorporativePayload } from "./payloads/corporative.payloads";
import { CorporativeCompanyAddedEvent, CorporativeCompanyMovedEvent, CorporativeCompanyRemovedEvent, CorporativeRemovedEvent } from "./events/corporative.events";
import { CompanyBranchAddedEvent, CompanyBranchMovedEvent, CompanyBranchRemovedEvent } from "./events/company.events";
import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { CompanyConflictError, CompanyNotFoundError } from "./errors/company.errors";
import { CorporativeForbiddenError, CorporativeInvalidError } from "./errors/corporative.errors";

export type CorporativeProps = AggregateProps & {
    companies: Company[];
    name: string;
};
export class Corporative extends Aggregate<CorporativeProps> {

    public get companies(): ReadonlyArray<Company> {
        return this.props.companies;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateCorporativePayload): Corporative {
        return new Corporative({
            id: crypto.randomUUID(),
            companies: [],
            ...value
        });
    }

    public static rehydrate(props: CorporativeProps): Corporative {
        const value = new Corporative(props);
        value.commit();
        return value;
    }

    private ensureUniqueCompanyRuc(ruc: string): void {
        if (this.props.companies.some(x => x.ruc === ruc))
            throw new CompanyConflictError(ruc);
    }

    public remove(): void {
        if (this.companies.length) throw new CorporativeForbiddenError(this.id);
        this.emit(new CorporativeRemovedEvent(this.id));
    }

    public addCompany(value: AddCompanyToCorporativePayload): void {
        this.ensureUniqueCompanyRuc(value.ruc);
        const newCompany = Company.create({
            corporativeId: this.id,
            ...value
        });
        this.updateProps({ companies: [...this.props.companies, newCompany] });
        this.emit(new CorporativeCompanyAddedEvent(newCompany));
    }

    public removeCompany(companyId: string): void {
        if (this.props.companies.some(x => x.id === companyId && x.branches.length))
            throw new CompanyNotFoundError(companyId);

        this.forceRemoveCompany(companyId);

        this.emit(new CorporativeCompanyRemovedEvent(companyId));
    }

    private forceRemoveCompany(companyId: string): void {
        const newCompanies = this.props.companies.filter(x => x.id !== companyId);
        if (newCompanies.length === this.props.companies.length)
            throw new CompanyNotFoundError(companyId);

        this.updateProps({ companies: newCompanies });
    }

    public moveCompanyTo(target: Corporative, companyId: string): void {
        const companyToMove = this.props.companies.find(x => x.id === companyId);
        if (!companyToMove) throw new CompanyNotFoundError(companyId);

        target.ensureUniqueCompanyRuc(companyToMove.ruc);

        this.forceRemoveCompany(companyId);
        target.updateProps({ companies: [...target.companies, companyToMove] });
        this.emit(new CorporativeCompanyMovedEvent({
            companyId: companyId,
            fromCorporativeId: this.id,
            toCorporativeId: target.id
        }));
    }

    public addBranchToCompany(value: AddBranchToCorporativePayload): void {
        const companyIndex = this.props.companies.findIndex(x => x.id === value.companyId);
        if (companyIndex < 0) throw new CompanyNotFoundError(value.companyId);

        const newCompanies = [...this.props.companies];
        newCompanies[companyIndex].addBranch(value);
        const newBranch = newCompanies[companyIndex].branches.slice(-1)[0];

        this.updateProps({ companies: newCompanies });
        this.emit(new CompanyBranchAddedEvent(newBranch));
    }

    public removeBranchFromCompany(value: RemoveBranchFromCorporativePayload): void {
        const companyIndex = this.props.companies.findIndex(x => x.id === value.companyId);
        if (companyIndex < 0) throw new CompanyNotFoundError(value.companyId);

        const newCompanies = [...this.props.companies];
        newCompanies[companyIndex].removeBranch(value.branchId);

        this.updateProps({ companies: newCompanies });
        this.emit(new CompanyBranchRemovedEvent(value.branchId));
    }

    public moveBranchTo(target: Corporative, payload: MoveBranchPayload): void {
        if (payload.fromCompanyId === payload.toCompanyId) throw new CorporativeInvalidError('BRANCH_MOVE');

        const fromCompany = this.props.companies.find(e => e.id === payload.fromCompanyId);
        if (!fromCompany) throw new CompanyNotFoundError(payload.fromCompanyId);

        const toCompany = target.companies.find(e => e.id === payload.toCompanyId);
        if (!toCompany) throw new CompanyNotFoundError(payload.toCompanyId);

        fromCompany.moveBranchTo(toCompany, payload.branchId);
        this.emit(new CompanyBranchMovedEvent({
            branchId: payload.branchId,
            fromCompanyId: payload.fromCompanyId,
            fromCorporativeId: this.id,
            toCompanyId: payload.toCompanyId,
            toCorporativeId: target.id
        }))
    }
}