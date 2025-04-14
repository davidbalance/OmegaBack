import { DomainEvent } from "@shared/shared/domain";
import { Company } from "../company.domain";
import { CorporativeExternalKeyProps } from "../value_objects/corporative-external-key.value-object";

const CorporativeEventKeys = {
    Removed: "corporative.emoved",
    CompanyAdded: "corporative.companyAdded",
    CompanyRemoved: "corporative.companyRemoved",
    CompanyMoved: "corporative.companyMoved",
    ExternalKeyAdded: "corporative.externalKey.added",
}

export class CorporativeIsEvent {
    public static isCorporativeRemovedEvent(event: DomainEvent<unknown>): event is CorporativeRemovedEvent {
        return event.key === CorporativeEventKeys.Removed;
    }

    public static isCorporativeCompanyAddedEvent(event: DomainEvent<unknown>): event is CorporativeCompanyAddedEvent {
        return event.key === CorporativeEventKeys.CompanyAdded;
    }

    public static isCorporativeCompanyRemovedEvent(event: DomainEvent<unknown>): event is CorporativeCompanyRemovedEvent {
        return event.key === CorporativeEventKeys.CompanyRemoved;
    }

    public static isCorporativeCompanyMovedEvent(event: DomainEvent<unknown>): event is CorporativeCompanyMovedEvent {
        return event.key === CorporativeEventKeys.CompanyMoved;
    }

    public static isCorporativeExternalKeyAddedEvent(event: DomainEvent<unknown>): event is CorporativeExternalKeyAddedEvent {
        return event.key === CorporativeEventKeys.ExternalKeyAdded;
    }

}

export type CorporativeRemovedEventPayload = {
    corporativeId: string;
}
export class CorporativeRemovedEvent extends DomainEvent<CorporativeRemovedEventPayload> {
    constructor(corporativeId: string) {
        super({ key: CorporativeEventKeys.Removed, value: { corporativeId } });
    }
}

export class CorporativeCompanyAddedEvent extends DomainEvent<Company> {
    constructor(value: Company) {
        super({ key: CorporativeEventKeys.CompanyAdded, value });
    }
}

export type CorporativeCompanyRemovedEventPayload = {
    companyId: string;
}
export class CorporativeCompanyRemovedEvent extends DomainEvent<CorporativeCompanyRemovedEventPayload> {
    constructor(companyId: string) {
        super({ key: CorporativeEventKeys.CompanyRemoved, value: { companyId } });
    }
}

export type CorporativeCompanyMovedEventPayload = {
    fromCorporativeId: string;
    toCorporativeId: string;
    companyId: string;
}
export class CorporativeCompanyMovedEvent extends DomainEvent<CorporativeCompanyMovedEventPayload> {
    constructor(value: CorporativeCompanyMovedEventPayload) {
        super({ key: CorporativeEventKeys.CompanyMoved, value });
    }
}

export class CorporativeExternalKeyAddedEvent extends DomainEvent<CorporativeExternalKeyProps> {
    constructor(value: CorporativeExternalKeyProps) {
        super({ key: CorporativeEventKeys.ExternalKeyAdded, value });
    }
}