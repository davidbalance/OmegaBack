export interface IncrementProvider {
    next(key: string): Promise<number>;
}