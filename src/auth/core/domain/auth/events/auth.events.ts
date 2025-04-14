import { DomainEvent } from "@shared/shared/domain";
import { ApiKey } from "../api-key.domain";
import { Token } from "../token.domain";

const AuthEventKeys = {
    PasswordEdited: "auth.passwordEdited",
    ApikeyAdded: "auth.apikeyAdded",
    ApikeyRemoved: "auth.apikeyRemoved",
    TokenAdded: "auth.tokenAdded",
    TokenRemoved: "auth.tokenRemoved",
    ResourceAdded: "auth.resourceAdded",
    ResourceRemoved: "auth.resourceRemoved",
    LogoAdded: "auth.logoAdded",
};

export class AuthIsEvent {
    public static isAuthPasswordEditedEvent(event: DomainEvent<unknown>): event is AuthPasswordEditedEvent {
        return event.key === AuthEventKeys.PasswordEdited;
    }

    public static isAuthApikeyAddedEvent(event: DomainEvent<unknown>): event is AuthApikeyAddedEvent {
        return event.key === AuthEventKeys.ApikeyAdded;
    }

    public static isAuthApikeyRemovedEvent(event: DomainEvent<unknown>): event is AuthApikeyRemovedEvent {
        return event.key === AuthEventKeys.ApikeyRemoved;
    }

    public static isAuthTokenAddedEvent(event: DomainEvent<unknown>): event is AuthTokenAddedEvent {
        return event.key === AuthEventKeys.TokenAdded;
    }

    public static isAuthTokenRemovedEvent(event: DomainEvent<unknown>): event is AuthTokenRemovedEvent {
        return event.key === AuthEventKeys.TokenRemoved;
    }

    public static isAuthResourceAddedEvent(event: DomainEvent<unknown>): event is AuthResourceAddedEvent {
        return event.key === AuthEventKeys.ResourceAdded;
    }

    public static isAuthResourceRemovedEvent(event: DomainEvent<unknown>): event is AuthResourceRemovedEvent {
        return event.key === AuthEventKeys.ResourceRemoved;
    }

    public static isAuthLogoAddedEvent(event: DomainEvent<unknown>): event is AuthLogoAddedEvent {
        return event.key === AuthEventKeys.LogoAdded;
    }
}

export type AuthPasswordEditedEventPayload = {
    authId: string;
    password: string;
}
export class AuthPasswordEditedEvent extends DomainEvent<AuthPasswordEditedEventPayload> {
    constructor(value: AuthPasswordEditedEventPayload) {
        super({ key: AuthEventKeys.PasswordEdited, value });
    }
}

export class AuthApikeyAddedEvent extends DomainEvent<ApiKey> {
    constructor(value: ApiKey) {
        super({ key: AuthEventKeys.ApikeyAdded, value });
    }
}

export type AuthApikeyRemovedEventPayload = {
    apikeyId: string;
}
export class AuthApikeyRemovedEvent extends DomainEvent<AuthApikeyRemovedEventPayload> {
    constructor(apikeyId: string) {
        super({ key: AuthEventKeys.ApikeyRemoved, value: { apikeyId } });
    }
}

export class AuthTokenAddedEvent extends DomainEvent<Token> {
    constructor(value: Token) {
        super({ key: AuthEventKeys.TokenAdded, value });
    }
}

export type AuthTokenRemovedEventPayload = {
    tokenId: string;
}
export class AuthTokenRemovedEvent extends DomainEvent<AuthTokenRemovedEventPayload> {
    constructor(tokenId: string) {
        super({ key: AuthEventKeys.TokenRemoved, value: { tokenId } });
    }
}

export type AuthResourceAddedEventPayload = {
    resourceId: string;
    authId: string;
}
export class AuthResourceAddedEvent extends DomainEvent<AuthResourceAddedEventPayload> {
    constructor(value: AuthResourceAddedEventPayload) {
        super({ key: AuthEventKeys.ResourceAdded, value });
    }
}

export type AuthResourceRemovedEventPayload = {
    authId: string;
    resourceId: string;
}
export class AuthResourceRemovedEvent extends DomainEvent<AuthResourceRemovedEventPayload> {
    constructor(value: AuthResourceRemovedEventPayload) {
        super({ key: AuthEventKeys.ResourceRemoved, value });
    }
}

export type AuthLogoAddedEventPayload = {
    authId: string;
    logoId: string;
}
export class AuthLogoAddedEvent extends DomainEvent<AuthLogoAddedEventPayload> {
    constructor(value: AuthLogoAddedEventPayload) {
        super({ key: AuthEventKeys.LogoAdded, value });
    }
}