import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { Morbidity } from "./entities/morbidity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MorbidityRepository extends AbstractRepository<number, Morbidity> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Morbidity) private readonly morbidityModel: Repository<Morbidity>
    ) {
        super(morbidityModel);
    }
}