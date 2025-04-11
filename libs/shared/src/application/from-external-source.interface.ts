export type CreateFromExternalSourcePayload = { owner: string };
export interface CreateFromExternalSource<T extends CreateFromExternalSourcePayload, R> {
    createAsync(value: T): Promise<R>;
}