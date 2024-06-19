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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<ExternalKey>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}