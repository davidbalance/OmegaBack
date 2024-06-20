import { Expose } from "class-transformer";

export class GETExamResponseDto {
    @Expose()
    public id: number;

    @Expose()
    public name: string;
}