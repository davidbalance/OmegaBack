import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "winston";
import { WebClient } from "../entities/web-client.entity";

@Injectable()
export class WebClientRepository
    extends AbstractRepository<number, WebClient>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebClient) private readonly clientModel: Repository<WebClient>
    ) {
        super(clientModel);
    }
}