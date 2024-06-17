import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDTO, FindOneUserAndDeleteResponseDTO, FindOneUserAndUpdateRequestDTO, FindUserResponseDTO, FindUsersResponseDTO, GETAttributeResponseDTO, PATCHUserExtraAttributeRequestDTO, PATCHUserExtraAttributeResponseDTO } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { User } from '@/shared/decorator';

@ApiTags('User/User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @User() user: number
  ): Promise<FindUsersResponseDTO> {
    const users = await this.userService.find(user);
    return plainToInstance(FindUsersResponseDTO, { users });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findOne(
    @User() user: number
  ): Promise<FindUserResponseDTO> {
    const foundUser = await this.userService.findOne(user);
    return plainToInstance(FindUserResponseDTO, foundUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.create(body);
    return plainToInstance(FindUserResponseDTO, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneUserAndUpdateRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.findOneAndUpdate(id, body)
    return plainToInstance(FindUserResponseDTO, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneUserAndDeleteResponseDTO> {
    await this.userService.findOneAndDelete(id);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('look/for/company/:id')
  async findLookForCompanyAttribute(
    @Param('id') id: number,
  ): Promise<GETAttributeResponseDTO> {
    const attribute = await this.userService.findExtraAttribute(id, 'look_for_company');
    return plainToInstance(GETAttributeResponseDTO, attribute);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('look/for/company/:id')
  async findOneAndUpdateLookForCompanyAttribute(
    @Param('id') id: number,
    @Body() body: PATCHUserExtraAttributeRequestDTO
  ): Promise<PATCHUserExtraAttributeResponseDTO> {
    await this.userService.assignExtraAttribute(id, { name: 'look_for_company', value: body.value });
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('employee/:id')
  async findEmployeeOfAttribute(
    @Param('id') id: number,
  ): Promise<GETAttributeResponseDTO> {
    const attribute = await this.userService.findExtraAttribute(id, 'employee_of');
    return plainToInstance(GETAttributeResponseDTO, attribute);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('employee/:id')
  async findOneAndUpdateEmployeeOfAttribute(
    @Param('id') id: number,
    @Body() body: PATCHUserExtraAttributeRequestDTO
  ): Promise<PATCHUserExtraAttributeResponseDTO> {
    await this.userService.assignExtraAttribute(id, { name: 'employee_of', value: body.value });
    return {};
  }
}