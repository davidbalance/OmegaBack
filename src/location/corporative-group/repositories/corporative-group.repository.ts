import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { CorporativeGroup } from "../entities/corporative-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CorporativeGroupRepository
    extends AbstractRepository<number, CorporativeGroup> {

    constructor(
        @InjectRepository(CorporativeGroup) private readonly corporativeModel: Repository<CorporativeGroup>
    ) {
        super(corporativeModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<CorporativeGroup>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}