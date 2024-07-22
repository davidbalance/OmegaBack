import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserCredentialService } from '../services/user-credential.service';
import { PostCredentialRequestDto } from '../dtos/request/post.user-credential.request.dto';
import { PostCredentialResponseDto } from '../dtos/response/post.user-credential.response.dto';
import { PatchChangePasswordResponseDto } from '../dtos/response/patch.change-password.response.dto';
import { PatchChangePasswordRequestDto } from '../dtos/request/patch.user-credential.request.dto';
@ApiTags('Authentication/Credential')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('credentials')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @Post()
  async create(
    @Body() body: PostCredentialRequestDto
  ): Promise<PostCredentialResponseDto> {
    await this.userCredentialService.create(body);
    return {};
  }

  @Patch()
  async findOneCredentialAndUpdatePassword(
    @Body() { email, password }: PatchChangePasswordRequestDto
  ): Promise<PatchChangePasswordResponseDto> {
    await this.userCredentialService.updatePassword(email, password);
    return {};
  }
}
