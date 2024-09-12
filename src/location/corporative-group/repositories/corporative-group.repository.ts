import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { CorporativeGroupEntity } from "../entities/corporative-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CorporativeGroupRepository
    extends AbstractRepository<number, CorporativeGroupEntity> {

    constructor(
        @InjectRepository(CorporativeGroupEntity) private readonly corporativeModel: Repository<CorporativeGroupEntity>
    ) {
        super(corporativeModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<CorporativeGroupEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}