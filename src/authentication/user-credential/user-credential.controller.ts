import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredential } from './entities/user-credential.entity';
import { CreateUserCredentialRequestDTO, CreateUserResponseDTO, UpdateUserCredentialPasswordRequestDTO } from 'src/shared';

@Controller('credential')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @Post()
  async create(
    @Body() body: CreateUserCredentialRequestDTO
  ): Promise<CreateUserResponseDTO> {
    const user = await this.userCredentialService.create(body);
    return { user: user.id };
  }

  @Get(':id')
  async findUser(
    @Param('id') id: number
  ): Promise<UserCredential> {
    return await this.userCredentialService.findByUser(id);
  }

  @Patch()
  async updatePassword(
    @Body() body: UpdateUserCredentialPasswordRequestDTO
  ): Promise<void> {
    await this.userCredentialService.updatePassword(body.email, body.password);
  }
}
