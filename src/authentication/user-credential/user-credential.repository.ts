import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database";
import { UserCredential } from "./entities/user-credential.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UserCredentialRepository
    extends AbstractRepository<number, UserCredential>{

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(UserCredential) private readonly userCredentialModel: Repository<UserCredential>
    ) {
        super(userCredentialModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<UserCredential>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false })
    }
}