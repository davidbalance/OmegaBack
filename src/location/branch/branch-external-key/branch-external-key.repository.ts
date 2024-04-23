import { AbstractRepository } from '@/shared';
import { Injectable, Logger } from '@nestjs/common';
import { BranchExternalKey } from './entities/branch-external-key.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BranchExternalKeyRepository extends AbstractRepository<number, BranchExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(BranchExternalKey) private readonly keyModel: Repository<BranchExternalKey>
    ) {
        super(keyModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<BranchExternalKey>): void | Promise<void> {
        throw new Error('Method not implemented.');
    }

}
