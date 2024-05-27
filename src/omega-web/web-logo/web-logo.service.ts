import { Inject, Injectable } from '@nestjs/common';
import { WebLogoRepository } from './web-logo.repository';
import { WebLogo } from './entities/web-logo.entity';

@Injectable()
export class WebLogoService {

    constructor(
        @Inject(WebLogoRepository) private readonly repository: WebLogoRepository
    ) { }

    async findOne(id: number): Promise<WebLogo> {
        const logo = await this.repository.findOne({ where: { id: id } });
        return logo;
    }
}
