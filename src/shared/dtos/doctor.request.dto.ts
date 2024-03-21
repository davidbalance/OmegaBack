import { IsStrongPassword } from "class-validator";
import { CreateUserRequestDTO } from "./user.request.dto";
import { PartialType } from "@nestjs/mapped-types";

export class CreateDoctorRequestDTO extends CreateUserRequestDTO {
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}

export class UpdateDoctorRequestDTO extends PartialType(CreateDoctorRequestDTO) { }