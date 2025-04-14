import { UserAuthResourceResponseDto } from "../dto/response/user.dto";
import { AuthResource } from "@shared/shared/providers/auth.provider";

export class UserAuthResourceMapper {
    public static toDTO(value: AuthResource): UserAuthResourceResponseDto {
        return { ...value }
    }
}