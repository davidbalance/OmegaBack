export interface QueryHandlerAsync<TQuery, TModel> {
    handleAsync(query: TQuery): Promise<TModel>;
}