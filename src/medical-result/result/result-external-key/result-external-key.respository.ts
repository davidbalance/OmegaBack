import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { ResultExternalKey } from "./entities/result-external-key.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ResultExternalKeyRepository extends AbstractRepository<number, ResultExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ResultExternalKey) private readonly keyModel: Repository<ResultExternalKey>
    ) {
        super(keyModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<ResultExternalKey>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}