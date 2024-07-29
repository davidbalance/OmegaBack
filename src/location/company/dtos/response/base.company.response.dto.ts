import { BranchResponseDto } from "@/location/branch/dtos/response/base.branch.response.dto";
import { Expose, Type } from "class-transformer";

export class CompanyResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly ruc: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly address: string;

    @Expose()
    public readonly phone: string;

    @Type(() => BranchResponseDto)
    @Expose()
    public readonly branches: BranchResponseDto[];
}