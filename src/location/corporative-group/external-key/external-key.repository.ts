import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExternalKey } from "./entities/external-key.entity";

@Injectable()
export class ExternalKeyRepository
    extends AbstractRepository<number, ExternalKey> {
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