import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredential } from './entities/user-credential.entity';
import { CreateCredentialRequestDTO, CreateCredentialResponseDTO, FindOneCredentialAndUpdatePasswordRequestDTO, FindOneCredentialAndUpdatePasswordResponseDTO } from './dtos';

@Controller('credential')
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
