import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CityEntity } from "../entities/city.entity";

@Injectable()
export class CityRepository extends AbstractRepository<number, CityEntity> {
    constructor(
        @InjectRepository(CityEntity) private readonly cityModel: Repository<CityEntity>
    ) {
        super(cityModel);
    }
}