import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "./base.user.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetUserArrayResponseDto implements ObjectArrayResponse<UserResponseDto> {
    @Type(() => UserResponseDto)
    @Expose() public readonly data: UserResponseDto[];
}
