import { Expose } from "class-transformer";

export class ExamTypeResponse {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
}