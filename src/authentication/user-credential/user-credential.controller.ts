import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards
} from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import {
  CreateCredentialRequestDTO,
  CreateCredentialResponseDTO,
  FindOneCredentialAndUpdatePasswordRequestDTO,
  FindOneCredentialAndUpdatePasswordResponseDTO
} from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('credentials')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @Authorize(ClaimEnum.CREATE, 'user-credential')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post()
  async create(
    @Body() body: CreateCredentialRequestDTO
  ): Promise<CreateCredentialResponseDTO> {
    await this.userCredentialService.create(body);
    return {};
  }

  @Authorize(ClaimEnum.UPDATE, 'user-credential')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch()
  async findOneCredentialAndUpdatePassword(
    @Body() { email, password }: FindOneCredentialAndUpdatePasswordRequestDTO
  ): Promise<FindOneCredentialAndUpdatePasswordResponseDTO> {
    await this.userCredentialService.findOneCredentialAndUpdatePassword(email, password);
    return {};
  }
}
