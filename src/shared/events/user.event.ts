export const UserEvent = {
    ON_CREATE: 'user.on.create',
    ON_UPDATE: 'user.on.update',
    ON_REMOVE: 'user.on.remove'
}

export class OnUserCreateEvent {
    constructor(
        public readonly id: number,
        public readonly dni: string
    ) { }
}

export class OnUserUpdateEvent {
    constructor(
        public readonly id: number,
        public readonly email: string
    ) { }
}

export class OnUserRemoveEvent {
    constructor(
        public readonly id: number
    ) { }
}