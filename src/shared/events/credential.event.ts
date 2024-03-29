export const CredentialEvent = {
    CREATE: 'credential.create',
    REMOVE: 'credential.remove'
}

export class CredentialCreateEvent {
    constructor(
        public readonly createEvent: { id: number }
    ) { }
}

export class CredentialRemoveEvent {
    constructor(
        public readonly removeEvent: { id: number, email: string }
    ) { }
}