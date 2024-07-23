import { WebLogoService } from '@/omega-web/web-logo/services/web-logo.service';
import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from '../repositories/web-client.repository';
import { PatchWebClientLogoRequestDto } from '../dtos/request/patch.web-client-logo.request.dto';

@Injectable()
export class WebClientLogoService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    @Inject(WebLogoService) private readonly logoService: WebLogoService) { }

  async updateLogo(user: number, { logo }: PatchWebClientLogoRequestDto): Promise<void> {
    const foundLogo = await this.logoService.findOne(logo);
    await this.repository.findOneAndUpdate(
      { user: user },
      { logo: foundLogo });
  }
}
