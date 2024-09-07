import { User } from "@/user/user/dtos/response/user.base.dto";
import { Expose } from "class-transformer";

export class Doctor extends User {
    @Expose() public readonly user: number;
    @Expose() public readonly hasFile: boolean;
}