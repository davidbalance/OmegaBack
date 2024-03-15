import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository, RepositoryUpdateStatusExtension } from "src/shared";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository
    extends AbstractRepository<number, User>
    implements RepositoryUpdateStatusExtension<number, User>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(User) private readonly userModel: Repository<User>
    ) {
        super(userModel);
    }

    async findOneAndUpdateStatus(id: number, status: boolean): Promise<User> {
        return await this.findOneAndUpdate({ id }, { status });
    }
}