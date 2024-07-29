export const CredentialEvent = {
    CREATE: 'credential.create',
    REMOVE: 'credential.remove'
}

export class CredentialCreateEvent {
    constructor(
        public readonly id: number
    ) { }
}

export class CredentialRemoveEvent {
    constructor(
        public readonly id: number,
        public readonly email: string
    ) { }
}