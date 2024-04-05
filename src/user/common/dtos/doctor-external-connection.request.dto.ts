import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserRequestDTO } from "./user.request.dto";

export class CreateDoctorExternalRequestDTO extends CreateUserRequestDTO { }

class CreateDoctorRequestDTOOmittedType extends OmitType(CreateDoctorExternalRequestDTO, ['dni']) { }
export class FindOneDoctorAndUpdateRequestDTO extends PartialType(CreateDoctorRequestDTOOmittedType) { }