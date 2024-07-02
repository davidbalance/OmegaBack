import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { ExternalKey } from "./entities/external-key.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ExternalKeyRepository extends AbstractRepository<number, ExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ExternalKey) private readonly keyModel: Repository<ExternalKey>
    ) {
        super(keyModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<ExternalKey>): Promise<void> {
        await this.keyModel.delete(filterOptions);
    }
}