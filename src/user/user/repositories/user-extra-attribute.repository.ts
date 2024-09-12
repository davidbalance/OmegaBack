import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { UserExtraAttributeEntity } from "../entities/user-extra-attribute.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserExtraAttributeRepository extends AbstractRepository<number, UserExtraAttributeEntity> {
    protected logger: Logger;

    constructor(
        @InjectRepository(UserExtraAttributeEntity) private readonly repo: Repository<UserExtraAttributeEntity>
    ) {
        super(repo);
    }
}