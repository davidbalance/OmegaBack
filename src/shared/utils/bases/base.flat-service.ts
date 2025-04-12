export interface FlatService<T, R> {
    flat: (data: T) => R;
}