import { AbstractRepository } from "@/shared";
import { WebClient } from "./entities/web-client.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class WebClientRepository extends AbstractRepository<number, WebClient>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebClient) private readonly clientModel: Repository<WebClient>
    ) {
        super(clientModel);
    }
}