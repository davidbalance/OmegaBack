import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { City } from "../entities/city.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CityRepository extends AbstractRepository<number, City> {
    constructor(
        @InjectRepository(City) private readonly cityModel: Repository<City>
    ) {
        super(cityModel);
    }
}