import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { City } from "./entities/city.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CityRepository extends AbstractRepository<string, City> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(City) private readonly cityModel: Repository<City>
    ) {
        super(cityModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<City>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}