import { DoctorFindManyQueryPayload } from "@omega/profile/application/query/user/doctor-find-many.query";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { IsObject, IsOptional, IsString, Min } from "class-validator";

export class DoctorFindManyQueryDto implements DoctorFindManyQueryPayload {
    @IsString()
    @IsOptional()
    public readonly filter?: string;

    @IsObject()
    @IsOptional()
    public readonly order?: Partial<Record<keyof UserModel, "asc" | "desc">>;

    @Min(0)
    public readonly skip: number;

    @Min(10)
    public readonly limit: number;
}