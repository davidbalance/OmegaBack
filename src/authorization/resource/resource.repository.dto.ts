import { AbstractRepository } from "@/shared";
import { Resource } from "./entities/resource.entity";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ResourceRepository
    extends AbstractRepository<number, Resource> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Resource) private readonly resourceModel: Repository<Resource>
    ) {
        super(resourceModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<Resource>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}