import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

@Injectable()
export class UserRepository
    extends AbstractRepository<number, UserEntity> {

    constructor(
        @InjectRepository(UserEntity) private readonly _: Repository<UserEntity>
    ) {
        super(_);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<UserEntity>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}