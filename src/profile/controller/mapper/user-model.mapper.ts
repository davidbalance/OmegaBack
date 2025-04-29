import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserResponseDto } from "../dto/response/user.dto";

export class UserModelMapper {
    public static toDTO(value: UserModel): UserResponseDto {
        return {
            userId: value.userId,
            userName: value.userName,
            userLastname: value.userLastname,
            userDni: value.userDni,
            userEmail: value.userEmail
        }
    }
}