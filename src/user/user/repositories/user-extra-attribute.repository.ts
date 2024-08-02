import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { UserExtraAttribute } from "../entities/user-extra-attribute.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserExtraAttributeRepository extends AbstractRepository<number, UserExtraAttribute> {
    protected logger: Logger;

    constructor(
        @InjectRepository(UserExtraAttribute) private readonly repo: Repository<UserExtraAttribute>
    ) {
        super(repo);
    }
}