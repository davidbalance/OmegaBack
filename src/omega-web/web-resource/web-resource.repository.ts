import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { WebResource } from "./entities/web-resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class WebResourceRespository
    extends AbstractRepository<number, WebResource> {
    protected logger: Logger;

    constructor(
        @InjectRepository(WebResource) private readonly resourceModel: Repository<WebResource>
    ) {
        super(resourceModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<WebResource>): Promise<void> {
        await this.resourceModel.delete(filterOptions)
    }
}