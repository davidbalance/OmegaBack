import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Body, Patch, Param, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { UserExtraAttributeService } from "../services/user-extra-attributes.service";
import { GetUserAttributeResponseDto } from "../dtos/response/get.user-extra-attribute.response.dto";
import { PatchUserExtraAttributeRequestDto } from "../dtos/request/patch.user-extra-attribute.request.dto";
import { PatchUserExtraAttributeResponseDto } from "../dtos/response/patch.user-extra-attribute.response.dto";

@ApiTags('User/User/Attribute')
@ApiBearerAuth()
@Controller('user/attribute')
@UseGuards(JwtAuthGuard)
export class UserExtraAttributeController {
  constructor(
    @Inject(UserExtraAttributeService) private readonly attributeService: UserExtraAttributeService
  ) { }

  @Get('look/for/company/:id')
  async findLookForCompanyAttribute(
    @Param('id') id: number,
  ): Promise<GetUserAttributeResponseDto> {
    const attribute = await this.attributeService.findUserAttribute(id, 'look_for_company');
    return plainToInstance(GetUserAttributeResponseDto, attribute);
  }

  @Patch('look/for/company/:id')
  async findOneAndUpdateLookForCompanyAttribute(
    @Param('id') id: number,
    @Body() body: PatchUserExtraAttributeRequestDto
  ): Promise<PatchUserExtraAttributeResponseDto> {
    await this.attributeService.assignAttribute(id, { name: 'look_for_company', ...body });
    return {};
  }

  @Get('employee/of/:id')
  async findEmployeeOfAttribute(
    @Param('id') id: number,
  ): Promise<GetUserAttributeResponseDto> {
    const attribute = await this.attributeService.findUserAttribute(id, 'employee_of');
    return plainToInstance(GetUserAttributeResponseDto, attribute);
  }

  @Patch('employee/of/:id')
  async findOneAndUpdateEmployeeOfAttribute(
    @Param('id') id: number,
    @Body() body: PatchUserExtraAttributeRequestDto
  ): Promise<PatchUserExtraAttributeResponseDto> {
    await this.attributeService.assignAttribute(id, { name: 'employee_of', ...body });
    return {};
  }

  @Get('doctor/of/:id')
  async findDoctorOfAttribute(
    @Param('id') id: number,
  ): Promise<GetUserAttributeResponseDto> {
    const attribute = await this.attributeService.findUserAttribute(id, 'doctor_of');
    return plainToInstance(GetUserAttributeResponseDto, attribute);
  }

  @Patch('doctor/of/:id')
  async findOneAndUpdateDoctorOfAttribute(
    @Param('id') id: number,
    @Body() body: PatchUserExtraAttributeRequestDto
  ): Promise<PatchUserExtraAttributeResponseDto> {
    await this.attributeService.assignAttribute(id, { name: 'doctor_of', ...body });
    return {};
  }
}