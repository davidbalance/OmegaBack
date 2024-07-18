import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExternalKey } from "./entities/external-key.entity";

@Injectable()
export class ExternalKeyRepository extends AbstractRepository<number, ExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ExternalKey) private readonly keyRepository: Repository<ExternalKey>
    ) {
        super(keyRepository);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<ExternalKey>): Promise<void> {
        await this.keyRepository.delete(filterOptions);
    }
}