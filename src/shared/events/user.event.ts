export const UserEvent = {
    CREATE: 'user.create',
    UPDATE: 'user.update',
    REMOVE: 'user.remove'
}

export class UserCreateEvent {
    constructor(
        public readonly createEvent: { id: number, dni: string }
    ) { }
}

export class UserUpdateEvent {
    constructor(
        public readonly updateEvent: { id: number, email: string }
    ) { }
}

export class UserRemoveEvent {
    constructor(
        public readonly removeEvent: { id: number }
    ) { }
}