export const CredentialEvent = {
    ON_CREATE: 'credential.on.create',
    ON_REMOVE: 'credential.on.remove'
}

export class OnCredentialCreateEvent {
    constructor(
        public readonly id: number
    ) { }
}

export class OnCredentialRemoveEvent {
    constructor(
        public readonly id: number
    ) { }
}