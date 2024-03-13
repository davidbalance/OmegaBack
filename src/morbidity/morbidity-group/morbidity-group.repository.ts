import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { MorbidityGroup } from "./entities/morbidity-group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Morbidity } from "../morbidity/entities/morbidity.entity";

interface MorbidityGroupRepositoryExtension {
    /**
     * Find a morbidity group and appends new morbidities
     * @param findOptions 
     * @param morbidities 
     */
    findOneAndAppendMorbidities(findOptions: FindOptionsWhere<Morbidity>, morbidities: Morbidity[]): Promise<MorbidityGroup>;
    /**
     * Find a morbidity group and remove morbidities
     * @param findOptions 
     * @param morbidities 
     */
    findOneAndRemoveMorbidities(findOptions: FindOptionsWhere<Morbidity>, morbidities: Morbidity[]): Promise<MorbidityGroup>;
}

@Injectable()
export class MorbidityGroupRepository extends AbstractRepository<number, MorbidityGroup> implements MorbidityGroupRepositoryExtension {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MorbidityGroup) private readonly groupModel: Repository<MorbidityGroup>
    ) {
        super(groupModel);
    }

    async findOneAndAppendMorbidities(findOptions: FindOptionsWhere<Morbidity>, morbidities: Morbidity[]): Promise<MorbidityGroup> {
        const entity = await this.findOne(findOptions, { morbidities: true });
        const filterMorbidities = entity.morbidities.filter(e => !morbidities.includes(e));
        entity.morbidities.concat(filterMorbidities);
        await this.groupModel.save(entity);
        return entity;
    }

    async findOneAndRemoveMorbidities(findOptions: FindOptionsWhere<Morbidity>, morbidities: Morbidity[]): Promise<MorbidityGroup> {
        const entity = await this.findOne(findOptions, { morbidities: true });
        const filterMorbidities = entity.morbidities.filter(e => morbidities.includes(e));
        entity.morbidities = filterMorbidities;
        await this.groupModel.save(entity);
        return entity;
    }
}