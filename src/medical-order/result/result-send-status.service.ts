import { Inject, Injectable } from '@nestjs/common';
import { ResultSendStatusRepositoryRepository } from './repositories/result-send-status.repository';
import { Result } from './entities/result.entity';
import { ResultSendStatus } from './entities/result-send-status.entity';

@Injectable()
export class ResultSendStatusService {

    constructor(
        @Inject(ResultSendStatusRepositoryRepository) private readonly repository: ResultSendStatusRepositoryRepository,
    ) { }

    async create(name: string, result: Result): Promise<ResultSendStatus> {
        return await this.repository.create({ name: name, result: result });
    }
}
