import { UseGuards, Controller, Inject, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamTypeManagementService } from "../services/exam-type-management.service";
import { GetExamTypeArrayResponseDto } from "../dtos/response/get.exam-type-array.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Laboratory/Exam/Type')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exam/types')
export class ExamTypeManagementController {
  constructor(
    @Inject(ExamTypeManagementService) private readonly service: ExamTypeManagementService
  ) { }

  @Get()
  async findAll(): Promise<GetExamTypeArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GetExamTypeArrayResponseDto, { data });
  }
}
