import { UpdateUserRequestDTO } from "./user.request.dto";
import { CreateUserCredentialRequestDTO } from "./user-credential.request.dto";

export class CreateDoctorRequestDTO extends CreateUserCredentialRequestDTO { }

export class UpdateDoctorRequestDTO extends UpdateUserRequestDTO { }