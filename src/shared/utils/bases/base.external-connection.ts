export type ExternalKeyParam = { key: string, source: string };

export interface ExternalConnectionRequest {
    source: string;
}

export interface IExternalConnectionService<T, R> {
    create(body: T): R | Promise<R>;
    findOneOrCreate(body: T): R | Promise<R>;
    findOneAndUpdate(key: ExternalKeyParam | any, body: T): R | Promise<R>;
}