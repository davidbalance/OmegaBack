import { Expose } from "class-transformer";

export class ExamResponseDto {
    @Expose()
    public id: number;

    @Expose()
    public name: string;
}