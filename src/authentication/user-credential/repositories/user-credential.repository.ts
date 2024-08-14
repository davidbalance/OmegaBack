import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { UserCredential } from "../entities/user-credential.entity";

@Injectable()
export class UserCredentialRepository
    extends AbstractRepository<number, UserCredential>{

    constructor(
        @InjectRepository(UserCredential) private readonly userCredentialModel: Repository<UserCredential>
    ) {
        super(userCredentialModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<UserCredential>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false })
    }
}