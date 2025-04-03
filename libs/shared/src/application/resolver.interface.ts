export type ResolverPayload = {}
export interface Resolver<T extends ResolverPayload, R> {
    resolve(value: T): Promise<R>;
}