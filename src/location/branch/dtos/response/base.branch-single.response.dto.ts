import { Expose } from "class-transformer";

export class BranchSingleResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
    
    @Expose()
    public readonly city: string;
}