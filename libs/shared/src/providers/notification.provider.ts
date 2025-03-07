export interface NotificationProvider<T> {
    emitAsync(payload: T): Promise<void>
}