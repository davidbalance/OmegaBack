import { AbstractRepository } from "@/shared";
import { AccessControl } from "./entity/access-control.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class AccessControlRepository
    extends AbstractRepository<number, AccessControl>{

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(AccessControl) private readonly accessModel: Repository<AccessControl>
    ) {
        super(accessModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<AccessControl>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}