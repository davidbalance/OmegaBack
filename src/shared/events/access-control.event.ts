export const AccessControlEvent = {
    UPDATE: 'access-control.update',
}

export class AccessControlUpdateEvent {
    constructor(
        public readonly updateEvent: {
            id: number,
            resources: string[]
        }
    ) { }
}