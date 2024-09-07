import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebLogoEntity } from "../entities/web-logo.entity";

@Injectable()
export class WebLogoRepository
    extends AbstractRepository<number, WebLogoEntity> {

    constructor(
        @InjectRepository(WebLogoEntity) private readonly logoModel: Repository<WebLogoEntity>
    ) {
        super(logoModel);
    }

}