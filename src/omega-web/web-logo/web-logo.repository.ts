import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { WebLogo } from "./entities/web-logo.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class WebLogoRepository
    extends AbstractRepository<number, WebLogo> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebLogo) private readonly logoModel: Repository<WebLogo>
    ) {
        super(logoModel);
    }

    findOneAndDelete(filterOptions: FindOptionsWhere<WebLogo>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

}