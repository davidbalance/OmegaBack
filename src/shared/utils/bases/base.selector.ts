import { Expose, Type } from "class-transformer";

export interface ISelectorOption<K> {
    key: K;
    label: string;
}

export class SelectorOption<K> implements ISelectorOption<K> {
    @Expose()
    @Type((options) => options.newObject.dataType)
    public readonly key: K;

    @Expose()
    public readonly label: string;

    private dataType: any;

    constructor(dataType: new () => K) {
        this.dataType = dataType;
    }
}

export class SelectorOptionArray<K> {
    @Expose()
    @Type((options) => options.newObject.dataType)
    public readonly options: SelectorOption<K>[];

    private dataType: any;

    constructor(dataType: new () => K) {
        this.dataType = dataType;
    }
}

export interface ISelectorOptionService<K> {
    find(params: any): Promise<ISelectorOption<K>[]> | ISelectorOption<K>[];
}