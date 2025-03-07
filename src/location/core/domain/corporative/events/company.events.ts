import { DomainEvent } from "@shared/shared/domain";
import { Branch } from "../branch.domain";

const CompanyEventKeys = {
    BranchAdded: "company.branchAdded",
    BranchRemoved: "company.branchRemoved",
    BranchMoved: "company.branchMoved",
}

export class CompanyIsEvent {
    public static isCompanyBranchAddedEvent(event: DomainEvent<unknown>): event is CompanyBranchAddedEvent {
        return event.key === CompanyEventKeys.BranchAdded;
    }

    public static isCompanyBranchRemovedEvent(event: DomainEvent<unknown>): event is CompanyBranchRemovedEvent {
        return event.key === CompanyEventKeys.BranchRemoved;
    }

    public static isCompanyBranchMovedEvent(event: DomainEvent<unknown>): event is CompanyBranchMovedEvent {
        return event.key === CompanyEventKeys.BranchMoved;
    }

}

export class CompanyBranchAddedEvent extends DomainEvent<Branch> {
    constructor(value: Branch) {
        super({ key: CompanyEventKeys.BranchAdded, value });
    }
}

export type CompanyBranchRemovedEventPayload = {
    branchId: string;
}
export class CompanyBranchRemovedEvent extends DomainEvent<CompanyBranchRemovedEventPayload> {
    constructor(branchId: string) {
        super({ key: CompanyEventKeys.BranchRemoved, value: { branchId } });
    }
}

export type CompanyBranchMovedEventPayload = {
    fromCorporativeId: string;
    fromCompanyId: string;
    toCorporativeId: string;
    toCompanyId: string;
    branchId: string;
}
export class CompanyBranchMovedEvent extends DomainEvent<CompanyBranchMovedEventPayload> {
    constructor(value: CompanyBranchMovedEventPayload) {
        super({ key: CompanyEventKeys.BranchMoved, value });
    }
}