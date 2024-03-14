import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { UserCredential } from "./entities/user-credential.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserCredentialRepository extends AbstractRepository<number, UserCredential>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(UserCredential) private readonly userCredentialModel: Repository<UserCredential>
    ) {
        super(userCredentialModel);
    }
}