import { AbstractRepository } from "src/shared";
import { Result } from "./entities/result.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Send } from "../send/entities/send.entity";

interface ResultRepositoryExtension {
    /**
     * Find one item and appends sends values
     * @param filterOptions 
     * @param sends 
     */
    findOneAndSend(filterOptions: FindOptionsWhere<Result>, sends: Send[]): Promise<Result>;
}

@Injectable()
export class ResultRepository extends AbstractRepository<number, Result> implements ResultRepositoryExtension {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Result) private readonly resultModel: Repository<Result>
    ) {
        super(resultModel);
    }

    async findOneAndSend(filterOptions: FindOptionsWhere<Result>, sends: Send[]): Promise<Result> {
        const entity = await this.findOne(filterOptions, { sends: true });
        const filterSend = entity.sends.filter(e => !sends.includes(e));
        entity.sends.concat(filterSend);
        await this.resultModel.save(entity);
        return entity;
    }
}