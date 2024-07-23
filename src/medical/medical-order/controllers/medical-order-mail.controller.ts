import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MedicalOrderMailService } from "../services/medical-order-mail.service";
import { PostMedicalOrderMailRequestDto } from "../dtos/request/post.medical-order-mail.request.dto";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders/mail')
@UseGuards(JwtAuthGuard)
export class MedicalOrderMaitController {
  constructor(
    @Inject(MedicalOrderMailService) private readonly service: MedicalOrderMailService
  ) { }

  @Post()
  async sendEmail(
    @Body() body: PostMedicalOrderMailRequestDto
  ): Promise<{ message: string }> {
    await this.service.send(body.order, body.mail);
    return { message: "ok" };
  }
}
