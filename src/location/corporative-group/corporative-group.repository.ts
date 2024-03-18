import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository, RepositoryUpdateStatusExtension } from "src/shared";
import { CorporativeGroup } from "./entities/corporative-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CorporativeGroupRepository
    extends AbstractRepository<number, CorporativeGroup>
    implements RepositoryUpdateStatusExtension<number, CorporativeGroup> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(CorporativeGroup) private readonly corporativeModel: Repository<CorporativeGroup>
    ) {
        super(corporativeModel);
    }

    async findOneAndUpdateStatus(id: number, status: boolean): Promise<CorporativeGroup> {
        return await this.findOneAndUpdate({ id }, { status });
    }
}