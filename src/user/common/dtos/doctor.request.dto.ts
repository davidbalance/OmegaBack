import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserRequestDTO } from "./user.request.dto";

export class CreateDoctorRequestDTO extends CreateUserRequestDTO { }

class CreateDoctorRequestDTOOmittedType extends OmitType(CreateDoctorRequestDTO, ['dni']) { }
export class FindOneDoctorAndUpdateRequestDTO extends PartialType(CreateDoctorRequestDTOOmittedType) { }