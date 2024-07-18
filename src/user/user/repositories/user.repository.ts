import { Injectable, Logger } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AbstractRepository } from "@/shared/sql-database";

@Injectable()
export class UserRepository
    extends AbstractRepository<number, User>{

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(User) private readonly _: Repository<User>
    ) {
        super(_);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<User>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}