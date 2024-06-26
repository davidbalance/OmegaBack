import { AbstractRepository } from "@/shared";
import { WebClient } from "./entities/web-client.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class WebClientRepository
    extends AbstractRepository<number, WebClient>{
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebClient) private readonly clientModel: Repository<WebClient>
    ) {
        super(clientModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<WebClient>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}