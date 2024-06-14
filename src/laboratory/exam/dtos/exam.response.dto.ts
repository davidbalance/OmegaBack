import { Expose } from "class-transformer";

export class GETExamResponseDTO {
    @Expose()
    public id: number;

    @Expose()
    public name: string;
}