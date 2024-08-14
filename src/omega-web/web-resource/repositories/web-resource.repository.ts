import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebResource } from "../entities/web-resource.entity";

@Injectable()
export class WebResourceRespository
    extends AbstractRepository<number, WebResource> {
    protected logger: Logger;

    constructor(
        @InjectRepository(WebResource) private readonly resourceModel: Repository<WebResource>
    ) {
        super(resourceModel);
    }
}