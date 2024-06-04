export type SelectorOption<K> = {
    key: K,
    label: string;
}

export interface FindFilePathService<K> {
    getpath(key: K): string | Promise<string>;
}