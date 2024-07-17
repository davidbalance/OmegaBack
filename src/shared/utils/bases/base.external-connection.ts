export interface IExternalConnectionService<T, R> {
    create(body: T): R | Promise<R>;
    findOneOrCreate(body: T): R | Promise<R>;
    findOneAndUpdate(key: any, body: T): R | Promise<R>;
}