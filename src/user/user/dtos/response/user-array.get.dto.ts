import { Expose, Type } from "class-transformer";
import { User } from "./user.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetUserArrayResponseDto implements ObjectArrayResponse<User> {
    @Type(() => User)
    @Expose() public readonly data: User[];
}
