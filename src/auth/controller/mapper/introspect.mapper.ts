import { AuthIntrospect } from "@omega/auth/application/type/auth.type";
import { IntrospectResponseDto } from "../dto/response/login.dto";

export class IntrospectMapper {
    static toDTO(value: AuthIntrospect): IntrospectResponseDto {
        return {
            active: value.active,
            email: value.email,
            lastname: value.lastname,
            logo: value.logo,
            name: value.name,
            sub: value.sub,
            resources: value.resources,
        }
    }
}