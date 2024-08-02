import { Expose, Type } from "class-transformer";

export class ObjectArrayResponse<T> {
    @Expose()
    @Type((options) => options.newObject.dataType)
    public readonly data: T[];

    private dataType: any;

    constructor(dataType: new () => T) {
        this.dataType = dataType;
    }
}