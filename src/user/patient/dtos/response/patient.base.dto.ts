import { Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { User } from "@/user/user/dtos/response/user.base.dto";

export class Patient extends OmitType(User, ['hasCredential', 'email']) {
    @Expose() public readonly birthday: Date;
    @Expose() public readonly gender: string;
    @Expose() public readonly user: number;
}