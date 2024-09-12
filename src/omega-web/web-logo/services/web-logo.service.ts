import { Inject, Injectable } from '@nestjs/common';
import { WebLogoEntity } from '../entities/web-logo.entity';
import { WebLogoRepository } from '../repositories/web-logo.repository';

@Injectable()
export class WebLogoService {

    constructor(
        @Inject(WebLogoRepository) private readonly repository: WebLogoRepository
    ) { }

    async findOne(id: number): Promise<WebLogoEntity> {
        const logo = await this.repository.findOne({ where: { id: id } });
        return logo;
    }
}
