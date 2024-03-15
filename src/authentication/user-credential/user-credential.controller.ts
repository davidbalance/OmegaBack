import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredential } from './entities/user-credential.entity';
import { UpdateUserCredentialPasswordRequestDTO } from 'src/shared';

@Controller('user-credential')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @Get(':id')
  async readOne(
    @Param('id') id: number
  ): Promise<UserCredential> {
    return await this.userCredentialService.readByUser(id);
  }

  @Patch()
  async updatePassword(
    @Body() body: UpdateUserCredentialPasswordRequestDTO
  ): Promise<void> {
    await this.userCredentialService.updatePassword(body.email, body.password);
  }
}
