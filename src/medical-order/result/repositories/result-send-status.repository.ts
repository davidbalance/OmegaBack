import { AbstractRepository } from "@/shared";
import { ResultSendStatus } from "../entities/result-send-status.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ResultSendStatusRepositoryRepository extends AbstractRepository<number, ResultSendStatus> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ResultSendStatus) private readonly senderModel: Repository<ResultSendStatus>
    ) {
        super(senderModel);
    }

}