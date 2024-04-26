import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleRequestDTO,
  FindOneRoleAndDeleteResponseDTO,
  FindOneRoleAndUpdateRequestDTO,
  FindOneRoleAndUpdateResponseDTO,
  FindRoleResponseDTO,
  FindRolesResponseDTO
} from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Authorization')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Authorize(ClaimEnum.READ, 'role')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindRolesResponseDTO> {
    const roles = await this.roleService.find();
    return plainToInstance(FindRolesResponseDTO, { roles });
  }

  @Authorize(ClaimEnum.CREATE, 'role')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post()
  async create(
    @Body() body: CreateRoleRequestDTO
  ): Promise<FindRoleResponseDTO> {
    const role = await this.roleService.create(body);
    return plainToInstance(FindRoleResponseDTO, role);
  }

  @Authorize(ClaimEnum.UPDATE, 'role')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneRoleAndUpdateRequestDTO
  ): Promise<FindOneRoleAndUpdateResponseDTO> {
    await this.roleService.findOneAndUpdate(id, body);
    return {};
  }

  @Authorize(ClaimEnum.DELETE, 'role')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneRoleAndDeleteResponseDTO> {
    await this.roleService.findOneAndDelete(id);
    return {};
  }
}