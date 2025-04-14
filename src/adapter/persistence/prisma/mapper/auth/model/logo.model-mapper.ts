import { LogoModel } from "@omega/auth/core/model/logo/logo.model";
import { LogoModel as PrismaLogoModel } from "@prisma/client";

export class LogoModelMapper {
    static toModel(value: PrismaLogoModel): LogoModel {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new LogoModel({ ...value });
    }
}