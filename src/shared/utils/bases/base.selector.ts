export interface SelectorOption<K> {
    key: K;
    label: string;
}

export interface SelectorOptionArray<T extends SelectorOption<any>> {
    options: T[];
}

export interface SelectorOptionService<K> {
    find(params: any): Promise<SelectorOption<K>[]> | SelectorOption<K>[];
}