import { AbstractRepository } from "@/shared";
import { SenderStatus } from "./entities/sender-status.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SenderStatusRepository extends AbstractRepository<number, SenderStatus>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(SenderStatus) private readonly senderModel: Repository<SenderStatus>
    ) {
        super(senderModel);
    }
}