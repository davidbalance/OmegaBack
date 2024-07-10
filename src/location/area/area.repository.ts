import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { Area } from "./entities/area.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AreaRepository extends AbstractRepository<number, Area> {
    protected logger: Logger;

    constructor(
        @InjectRepository(Area) private readonly repo: Repository<Area>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Area>): Promise<void> {
        await this.repo.delete(filterOptions);
    }
}