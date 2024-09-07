import { Expose } from "class-transformer";

export class Disease {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly group: number;
}