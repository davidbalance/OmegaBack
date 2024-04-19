import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequestDTO,
  FindOneUserAndDeleteResponseDTO,
  FindOneUserAndUpdateRequestDTO,
  FindUserResponseDTO,
  FindUsersResponseDTO
} from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Authorize(ClaimEnum.READ, 'users')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindUsersResponseDTO> {
    const users = await this.userService.find();
    return plainToInstance(FindUsersResponseDTO, { users });
  }

  @Authorize(ClaimEnum.CREATE, 'users')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post()
  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.create(body);
    return plainToInstance(FindUserResponseDTO, user);
  }

  @Authorize(ClaimEnum.UPDATE, 'users')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneUserAndUpdateRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.findOneAndUpdate(id, body)
    return plainToInstance(FindUserResponseDTO, user);
  }

  @Authorize(ClaimEnum.DELETE, 'users')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneUserAndDeleteResponseDTO> {
    await this.userService.findOneAndDelete(id);
    return {};
  }
}