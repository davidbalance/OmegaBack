import { LoginResponseDto } from "../dto/response/login.dto";

export class LoginMapper {
    static toDTO(value: { accessToken: string, refreshToken: string }): LoginResponseDto {
        return {
            accessToken: value.accessToken,
            refreshToken: value.refreshToken
        }
    }
}