import { LogoModel } from "@omega/auth/core/model/logo/logo.model";
import { LogoResponseDto } from "../dto/response/logo.dto";

export class LogoModelMapper {
    static toDTO(value: LogoModel): LogoResponseDto {
        return {
            logoId: value.logoId,
            logoName: value.logoName
        }
    }
}