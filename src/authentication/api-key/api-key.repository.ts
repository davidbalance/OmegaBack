import { AbstractRepository } from "@/shared";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ApiKey } from "./entities/api-key.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ApiKeyRepository extends AbstractRepository<number, ApiKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ApiKey) private readonly apikeyModel: Repository<ApiKey>
    ) {
        super(apikeyModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<ApiKey>): void | Promise<void> {
        this.findOneAndUpdate(filterOptions, { status: false });
    }

    findAndDelete(filterOptions: FindOptionsWhere<ApiKey>): void | Promise<void> {
        this.apikeyModel.update(filterOptions, { status: false });
    }

}