export interface CommandHandlerAsync<TQuery, TReturn> {
    handleAsync(value: TQuery): Promise<TReturn>;
}