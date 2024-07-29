import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CorporativeGroupExternalKey } from "../entities/corporative-group-external-key.entity";

@Injectable()
export class CorporativeGroupExternalKeyRepository
    extends AbstractRepository<number, CorporativeGroupExternalKey> {

    constructor(
        @InjectRepository(CorporativeGroupExternalKey) private readonly keyModel: Repository<CorporativeGroupExternalKey>
    ) {
        super(keyModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<CorporativeGroupExternalKey>): Promise<void> {
        await this.keyModel.delete(filterOptions);
    }
}