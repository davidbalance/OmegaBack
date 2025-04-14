import { DomainEvent } from "@shared/shared/domain";
import { Email } from "../email.domain";
import { EditClientPayload } from "../payloads/client.payloads";
import { Record } from "../record.domain";

const ClientEventKeys = {
    Edited: "client.edited",
    Deleted: "client.deleted",
    AddedEmail: "client.addedEmail",
    EmailSettedAsDefault: "client.emailSettedAsDefault",
    RemovedEmail: "client.removedEmail",
    AddedManagement: "client.addedManagement",
    AddedArea: "client.addedArea",
    AddedJobPosition: "client.addedJobPosition",
    AddedRecord: "client.addedRecord",
}

export class ClientIsEvent {
    public static isClientEditedEvent(event: DomainEvent<unknown>): event is ClientEditedEvent {
        return event.key === ClientEventKeys.Edited;
    }

    public static isClientDeletedEvent(event: DomainEvent<unknown>): event is ClientDeletedEvent {
        return event.key === ClientEventKeys.Deleted;
    }

    public static isClientAddedEmailEvent(event: DomainEvent<unknown>): event is ClientAddedEmailEvent {
        return event.key === ClientEventKeys.AddedEmail;
    }

    public static isClientEmailSettedAsDefault(event: DomainEvent<unknown>): event is ClientEmailSettedAsDefaultEvent {
        return event.key === ClientEventKeys.EmailSettedAsDefault;
    }

    public static isClientEmailRemovedEvent(event: DomainEvent<unknown>): event is ClientEmailRemovedEvent {
        return event.key === ClientEventKeys.RemovedEmail;
    }

    public static isClientManagementAddedEvent(event: DomainEvent<unknown>): event is ClientManagementAddedEvent {
        return event.key === ClientEventKeys.AddedManagement;
    }

    public static isClientAreaAddedEvent(event: DomainEvent<unknown>): event is ClientAreaAddedEvent {
        return event.key === ClientEventKeys.AddedArea;
    }

    public static isClientJobPositionAddedEvent(event: DomainEvent<unknown>): event is ClientJobPositionAddedEvent {
        return event.key === ClientEventKeys.AddedJobPosition;
    }

    public static isClientRecordAddedEvent(event: DomainEvent<unknown>): event is ClientRecordAddedEvent {
        return event.key === ClientEventKeys.AddedRecord;
    }
}

export type ClientEditedEventPayload = EditClientPayload & {
    patientDni: string;
}
export class ClientEditedEvent extends DomainEvent<ClientEditedEventPayload> {
    constructor(value: ClientEditedEventPayload) {
        super({ key: ClientEventKeys.Edited, value });
    }
}

export type ClientDeletedEventPayload = EditClientPayload & {
    dni: string;
}
export class ClientDeletedEvent extends DomainEvent<ClientDeletedEventPayload> {
    constructor(dni: string) {
        super({ key: ClientEventKeys.Edited, value: { dni } });
    }
}

export class ClientAddedEmailEvent extends DomainEvent<Email> {
    constructor(value: Email) {
        super({ key: ClientEventKeys.AddedEmail, value });
    }
}

export type ClientEmailSettedAsDefaultEventPayload = {
    clientId: string;
    emailId: string;
}
export class ClientEmailSettedAsDefaultEvent extends DomainEvent<ClientEmailSettedAsDefaultEventPayload> {
    constructor(value: ClientEmailSettedAsDefaultEventPayload) {
        super({ key: ClientEventKeys.EmailSettedAsDefault, value });
    }
}

export type ClientEmailRemovedEventPayload = {
    emailId: string;
}
export class ClientEmailRemovedEvent extends DomainEvent<ClientEmailRemovedEventPayload> {
    constructor(emailId: string) {
        super({ key: ClientEventKeys.RemovedEmail, value: { emailId } });
    }
}

export type ClientManagementAddedEventPayload = {
    clientId: string;
    managementId: string;
    managementName: string;
}
export class ClientManagementAddedEvent extends DomainEvent<ClientManagementAddedEventPayload> {
    constructor(value: ClientManagementAddedEventPayload) {
        super({ key: ClientEventKeys.AddedManagement, value });
    }
}

export type ClientAreaAddedEventPayload = {
    clientId: string;
    areaId: string;
    areaName: string;
}
export class ClientAreaAddedEvent extends DomainEvent<ClientAreaAddedEventPayload> {
    constructor(value: ClientAreaAddedEventPayload) {
        super({ key: ClientEventKeys.AddedArea, value });
    }
}

export type ClientJobPositionAddedEventPayload = {
    clientId: string;
    jobPosition: string;
}
export class ClientJobPositionAddedEvent extends DomainEvent<ClientJobPositionAddedEventPayload> {
    constructor(value: ClientJobPositionAddedEventPayload) {
        super({ key: ClientEventKeys.AddedJobPosition, value });
    }
}

export class ClientRecordAddedEvent extends DomainEvent<Record> {
    constructor(value: Record) {
        super({ key: ClientEventKeys.AddedRecord, value });
    }
}