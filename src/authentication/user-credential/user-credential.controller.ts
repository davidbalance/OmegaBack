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

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('credentials')
export class UserCredentialController {
  constructor(private readonly userCredentialService: UserCredentialService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateCredentialRequestDTO
  ): Promise<CreateCredentialResponseDTO> {
    await this.userCredentialService.create(body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async findOneCredentialAndUpdatePassword(
    @Body() { email, password }: FindOneCredentialAndUpdatePasswordRequestDTO
  ): Promise<FindOneCredentialAndUpdatePasswordResponseDTO> {
    await this.userCredentialService.findOneCredentialAndUpdatePassword(email, password);
    return {};
  }
}
