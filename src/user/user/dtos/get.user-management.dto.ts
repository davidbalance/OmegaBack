import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "./user.dto";

export class GETUserResponseDto extends UserResponseDto { }

export class GETUserArrayResponseDto {
    @Type(() => GETUserResponseDto)
    @Expose() public readonly users: GETUserResponseDto[];
}
