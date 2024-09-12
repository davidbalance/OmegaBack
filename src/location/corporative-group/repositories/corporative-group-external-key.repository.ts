import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CorporativeGroupExternalKeyEntity } from "../entities/corporative-group-external-key.entity";

@Injectable()
export class CorporativeGroupExternalKeyRepository
    extends AbstractRepository<number, CorporativeGroupExternalKeyEntity> {

    constructor(
        @InjectRepository(CorporativeGroupExternalKeyEntity) private readonly keyModel: Repository<CorporativeGroupExternalKeyEntity>
    ) {
        super(keyModel);
    }
}