export type ExternalKeyParam = { key: string, source: string };

export interface ExternalConnectionKeyRequest {
    key: string;
}

export interface ExternalConnectionSourceRequest {
    source: string;
}

export interface ExternalConnectionRequest {
    key: string;
    source: string;
}

export interface IExternalConnectionService<T, R> {
    findOne(key: ExternalKeyParam | any): Promise<R>;
    create(body: T): R | Promise<R>;
    findOneOrCreate(body: T): R | Promise<R>;
    findOneAndUpdate(key: ExternalKeyParam | any, body: T): R | Promise<R>;
}