import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchExternalKey } from '../entities/branch-external-key.entity';
import { AbstractRepository } from '@/shared/sql-database/abstract.repository';

@Injectable()
export class BranchExternalKeyRepository extends AbstractRepository<number, BranchExternalKey> {

    constructor(
        @InjectRepository(BranchExternalKey) private readonly keyModel: Repository<BranchExternalKey>
    ) {
        super(keyModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<BranchExternalKey>): Promise<void> {
        await this.keyModel.delete(filterOptions);
    }
}
