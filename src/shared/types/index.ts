export type SelectorOption<K> = {
    key: K,
    label: string;
}

export interface FindFilePathService<K> {
    getpath(key: K): string | Promise<string>;
}

export interface RemoveFileService<K> {
    removeFile(key: K): boolean | Promise<boolean>;
}