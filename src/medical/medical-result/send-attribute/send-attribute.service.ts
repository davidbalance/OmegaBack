import { Inject, Injectable } from '@nestjs/common';
import { SendAttribute } from './entities/send-attribute.entity';
import { SendAttributeRepository } from './send-attribute.repository';
import { AbstractSendAttributeService } from '@/shared/send-attribute';

@Injectable()
export class SendAttributeService extends AbstractSendAttributeService<SendAttribute, SendAttributeRepository> {

    constructor(
        @Inject(SendAttributeRepository) private readonly repository: SendAttributeRepository
    ) {
        super(repository);
    }
}
