import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { MorbidityGroup } from "./entities/morbidity-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Morbidity } from "../morbidity/entities/morbidity.entity";

@Injectable()
export class MorbidityGroupRepository
    extends AbstractRepository<number, MorbidityGroup> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MorbidityGroup) private readonly groupModel: Repository<MorbidityGroup>
    ) {
        super(groupModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<MorbidityGroup>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}