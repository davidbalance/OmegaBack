import {
  Controller,
  Post,
  Body,
  Patch
} from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import {
  CreateCredentialRequestDTO,
  CreateCredentialResponseDTO,
  FindOneCredentialAndUpdatePasswordRequestDTO,
  FindOneCredentialAndUpdatePasswordResponseDTO
} from './dtos';

@Controller('credentials')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @Post()
  async create(
    @Body() body: CreateCredentialRequestDTO
  ): Promise<CreateCredentialResponseDTO> {
    await this.userCredentialService.create(body);
    return;
  }

  @Patch()
  async findOneCredentialAndUpdatePassword(
    @Body() { email, password }: FindOneCredentialAndUpdatePasswordRequestDTO
  ): Promise<FindOneCredentialAndUpdatePasswordResponseDTO> {
    await this.userCredentialService.findOneCredentialAndUpdatePassword(email, password);
    return;
  }
}
