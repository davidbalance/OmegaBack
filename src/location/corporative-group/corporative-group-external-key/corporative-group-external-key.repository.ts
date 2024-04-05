import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { CorporativeGroupExternalKey } from "./entities/corporative-group-external-key.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CorporativeGroupExternalKeyRepository
    extends AbstractRepository<number, CorporativeGroupExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(CorporativeGroupExternalKey) private readonly keyModel: Repository<CorporativeGroupExternalKey>
    ) {
        super(keyModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<CorporativeGroupExternalKey>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

}