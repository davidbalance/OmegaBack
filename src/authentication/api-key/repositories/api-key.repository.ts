import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { ApiKey } from "../entities/api-key.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ApiKeyRepository extends AbstractRepository<number, ApiKey> {
    constructor(
        @InjectRepository(ApiKey) private readonly apikeyModel: Repository<ApiKey>
    ) {
        super(apikeyModel);
    }

}