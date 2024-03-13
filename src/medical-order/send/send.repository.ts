import { AbstractRepository } from "src/shared";
import { Send } from "./entities/send.entity";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SendRepository extends AbstractRepository<number, Send> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Send) private readonly sendModel: Repository<Send>
    ) {
        super(sendModel);
    }
}