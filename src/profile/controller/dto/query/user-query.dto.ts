import { UserFindManyQueryPayload } from "@omega/profile/application/query/user/user-find-many.query";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class UserFindManyQueryDto implements Omit<UserFindManyQueryPayload, 'order'> {
    @IsString()
    @IsOptional()
    public readonly filter?: string;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof UserModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: 'asc' | 'desc';

    @Type(() => Number)
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @Min(10)
    public readonly limit: number;
}