import { AbstractSendAttributeService } from '@/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ResultSendAttribute } from './entities/result-send-attribute.entity';
import { ResultSendAttributeRepository } from './result-send-attribute.repository';

@Injectable()
export class ResultSendAttributeService extends AbstractSendAttributeService<ResultSendAttribute, ResultSendAttributeRepository> {

    constructor(
        @Inject(ResultSendAttributeRepository) private readonly repository: ResultSendAttributeRepository
    ) {
        super(repository);
    }
}
