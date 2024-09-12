import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebResourceEntity } from "../entities/web-resource.entity";

@Injectable()
export class WebResourceRespository
    extends AbstractRepository<number, WebResourceEntity> {
    protected logger: Logger;

    constructor(
        @InjectRepository(WebResourceEntity) private readonly resourceModel: Repository<WebResourceEntity>
    ) {
        super(resourceModel);
    }
}