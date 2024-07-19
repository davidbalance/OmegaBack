import { Injectable, Logger } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@/shared/sql-database';
import { BranchExternalKey } from '../entities/branch-external-key.entity';

@Injectable()
export class BranchExternalKeyRepository extends AbstractRepository<number, BranchExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(BranchExternalKey) private readonly keyModel: Repository<BranchExternalKey>
    ) {
        super(keyModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<BranchExternalKey>): Promise<void> {
        await this.keyModel.delete(filterOptions);
    }
}
