import { UseGuards, Controller, Inject, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ExamTypeOptionService } from "../services/exam-type-option.service";
import { GetExtendedExamTypeArrayResponseDto } from "../dtos/response/extended-exam-type-array.base.dto";

@ApiTags('Laboratory/Exam/Type', 'Options')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exam/types/options')
export class ExamTypeOptionController {
  constructor(
    @Inject(ExamTypeOptionService) private readonly service: ExamTypeOptionService
  ) { }

  @Get()
  async find(): Promise<GetExtendedExamTypeArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetExtendedExamTypeArrayResponseDto, { data });
  }
}
