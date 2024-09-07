import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchExternalKeyEntity } from '../entities/branch-external-key.entity';
import { AbstractRepository } from '@/shared/sql-database/abstract.repository';

@Injectable()
export class BranchExternalKeyRepository extends AbstractRepository<number, BranchExternalKeyEntity> {

    constructor(
        @InjectRepository(BranchExternalKeyEntity) private readonly keyModel: Repository<BranchExternalKeyEntity>
    ) {
        super(keyModel);
    }
}
