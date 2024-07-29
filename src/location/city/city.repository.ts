import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database";
import { City } from "./entities/city.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CityRepository extends AbstractRepository<number, City> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(City) private readonly cityModel: Repository<City>
    ) {
        super(cityModel);
    }
}