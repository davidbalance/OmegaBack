import { WebLogoService } from '@/omega-web/web-logo/services/web-logo.service';
import { Inject, Injectable } from '@nestjs/common';
import { WebClientRepository } from '../repositories/web-client.repository';
import { PatchWebClientLogoRequestDto } from '../dtos/request/web-client-logo.patch.dto';

@Injectable()
export class WebClientLogoService {

  constructor(
    @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    @Inject(WebLogoService) private readonly logoService: WebLogoService) { }

  async findLogo(user: number): Promise<string> {
    const foundLogo = await this.repository.findOne({ where: { user } });
    return foundLogo.logo.name;
  }

  async updateLogo(user: number, { logo }: PatchWebClientLogoRequestDto): Promise<void> {
    const foundLogo = await this.logoService.findOne(logo);
    await this.repository.findOneAndUpdate(
      { user: user },
      { logo: foundLogo });
  }
}
