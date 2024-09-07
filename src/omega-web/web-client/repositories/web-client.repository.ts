import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebClientEntity } from "../entities/web-client.entity";

@Injectable()
export class WebClientRepository
    extends AbstractRepository<number, WebClientEntity>{

    constructor(
        @InjectRepository(WebClientEntity) private readonly clientModel: Repository<WebClientEntity>
    ) {
        super(clientModel);
    }
}