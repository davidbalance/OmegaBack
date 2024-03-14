import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends AbstractRepository<number, User> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(User) private readonly userModel: Repository<User>
    ) {
        super(userModel);
    }
}