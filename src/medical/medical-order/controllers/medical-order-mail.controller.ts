import { Controller, UseGuards, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MedicalOrderMailService } from "../services/medical-order-mail.service";
import { PostMedicalOrderMailRequestDto } from "../dtos/request/medical-order-mail.post.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/orders/mail')
export class MedicalOrderMailController {
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
