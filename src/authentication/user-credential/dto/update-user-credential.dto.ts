import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCredentialDto } from './create-user-credential.dto';

export class UpdateUserCredentialDto extends PartialType(CreateUserCredentialDto) {}
