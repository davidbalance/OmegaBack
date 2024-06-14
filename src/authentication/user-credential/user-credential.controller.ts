import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PATCHCredentialPasswordChangeRequestDTO, POSTCredentialRequestDTO } from './dtos/user-credential.request.dto';
import { PATCHCredentialPasswordChangeResponseDTO, POSTCredentialResponseDTO } from './dtos/user-credential.response.dto';

@ApiTags('Authentication/Credential')
@ApiBearerAuth()
@Controller('credentials')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTCredentialRequestDTO
  ): Promise<POSTCredentialResponseDTO> {
    await this.userCredentialService.create(body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async findOneCredentialAndUpdatePassword(
    @Body() { email, password }: PATCHCredentialPasswordChangeRequestDTO
  ): Promise<PATCHCredentialPasswordChangeResponseDTO> {
    await this.userCredentialService.findOneCredentialAndUpdatePassword(email, password);
    return {};
  }
}
