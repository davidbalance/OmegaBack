import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { UserExtraAttribute } from "../entities/user-extra-attribute";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserExtraAttributeRepository extends AbstractRepository<number, UserExtraAttribute> {
    protected logger: Logger;

    constructor(
        @InjectRepository(UserExtraAttribute) private readonly repo: Repository<UserExtraAttribute>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<UserExtraAttribute>): Promise<void> {
        await this.repo.delete(filterOptions);
    }
}