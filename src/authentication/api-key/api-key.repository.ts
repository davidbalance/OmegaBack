import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
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

    /**
     * Delete all the items that matches the given options
     * @param filterOptions 
     */
    findAndDelete(filterOptions: FindOptionsWhere<ApiKey>): void | Promise<void> {
        this.apikeyModel.update(filterOptions, { status: false });
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<ApiKey>): Promise<void> {
        this.findOneAndUpdate(filterOptions, { status: false });
    }

}