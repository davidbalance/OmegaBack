import { DomainEvent } from "@shared/shared/domain";
import { Attribute } from "../attribute.domain";
import { Patient } from "../patient.domain";
import { Doctor } from "../doctor.domain";

const UserEventKeys = {
    Removed: "user.removed",
    Edited: "user.edited",
    AuthAdded: "user.authAdded",
    AuthRemoved: "user.authRemoved",
    AttributeAdded: "user.attributeAdded",
    AttributeUpdatedValue: "user.attributeUpdatedValue",
    AttributeRemoved: "user.attributeRemoved",
    PatientAdded: "user.patientAdded",
    DoctorAdded: "user.doctorAdded",
    DoctorAddFile: "user.doctorAddFile",
}

export class UserIsEvent {

    public static isUserRemovedEvent(event: DomainEvent<unknown>): event is UserRemovedEvent {
        return event.key === UserEventKeys.Removed;
    }

    public static isUserEditedEvent(event: DomainEvent<unknown>): event is UserEditedEvent {
        return event.key === UserEventKeys.Edited;
    }

    public static isUserAuthAddedEvent(event: DomainEvent<unknown>): event is UserAuthAddedEvent {
        return event.key === UserEventKeys.AuthAdded;
    }

    public static isUserAuthRemovedEvent(event: DomainEvent<unknown>): event is UserAuthRemovedEvent {
        return event.key === UserEventKeys.AuthRemoved;
    }

    public static isUserAttributeAddedEvent(event: DomainEvent<unknown>): event is UserAttributeAddedEvent {
        return event.key === UserEventKeys.AttributeAdded;
    }

    public static isUserAttributeUpdatedValueEvent(event: DomainEvent<unknown>): event is UserAttributeUpdatedValueEvent {
        return event.key === UserEventKeys.AttributeUpdatedValue;
    }

    public static isUserAttributeRemovedEvent(event: DomainEvent<unknown>): event is UserAttributeRemovedEvent {
        return event.key === UserEventKeys.AttributeRemoved;
    }

    public static isUserPatientAddedEvent(event: DomainEvent<unknown>): event is UserPatientAddedEvent {
        return event.key === UserEventKeys.PatientAdded;
    }

    public static isUserDoctorAddedEvent(event: DomainEvent<unknown>): event is UserDoctorAddedEvent {
        return event.key === UserEventKeys.DoctorAdded;
    }

    public static isUserDoctorAddFileEvent(event: DomainEvent<unknown>): event is UserDoctorAddFileEvent {
        return event.key === UserEventKeys.DoctorAddFile;
    }


}

export type UserRemovedEventPayload = {
    userId: string;
}
export class UserRemovedEvent extends DomainEvent<UserRemovedEventPayload> {
    constructor(userId: string) {
        super({ key: UserEventKeys.Removed, value: { userId } });
    }
}
export type UserEditedEventPayload = {
    userId: string;
    userName: string;
    userLastname: string;
}
export class UserEditedEvent extends DomainEvent<UserEditedEventPayload> {
    constructor(value: UserEditedEventPayload) {
        super({ key: UserEventKeys.Edited, value });
    }
}

export type UserAuthAddedEventPayload = {
    auth: string;
    userId: string;
}
export class UserAuthAddedEvent extends DomainEvent<UserAuthAddedEventPayload> {
    constructor(value: UserAuthAddedEventPayload) {
        super({ key: UserEventKeys.AuthAdded, value });
    }
}

export type UserAuthRemovedEventPayload = {
    userId: string;
}
export class UserAuthRemovedEvent extends DomainEvent<UserAuthRemovedEventPayload> {
    constructor(userId: string) {
        super({ key: UserEventKeys.AuthRemoved, value: { userId } });
    }
}

export class UserAttributeAddedEvent extends DomainEvent<Attribute> {
    constructor(value: Attribute) {
        super({ key: UserEventKeys.AttributeAdded, value });
    }
}

export type UserAttributeUpdatedValueEventPayload = {
    attributeId: string;
    attributeValue: string;
}
export class UserAttributeUpdatedValueEvent extends DomainEvent<UserAttributeUpdatedValueEventPayload> {
    constructor(value: UserAttributeUpdatedValueEventPayload) {
        super({ key: UserEventKeys.AttributeUpdatedValue, value });
    }
}

export type UserAttributeRemovedEventPayload = {
    attributeId: string;
}
export class UserAttributeRemovedEvent extends DomainEvent<UserAttributeRemovedEventPayload> {
    constructor(attributeId: string) {
        super({ key: UserEventKeys.AttributeRemoved, value: { attributeId } });
    }
}

export class UserPatientAddedEvent extends DomainEvent<Patient> {
    constructor(value: Patient) {
        super({ key: UserEventKeys.PatientAdded, value });
    }
}

export class UserDoctorAddedEvent extends DomainEvent<Doctor> {
    constructor(value: Doctor) {
        super({ key: UserEventKeys.DoctorAdded, value });
    }
}

export type UserDoctorAddFileEventPayload = {
    doctorId: string;
}
export class UserDoctorAddFileEvent extends DomainEvent<UserDoctorAddFileEventPayload> {
    constructor(doctorId: string) {
        super({ key: UserEventKeys.DoctorAddFile, value: { doctorId } });
    }
}