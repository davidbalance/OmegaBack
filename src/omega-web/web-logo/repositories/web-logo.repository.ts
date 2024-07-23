import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebLogo } from "../entities/web-logo.entity";

@Injectable()
export class WebLogoRepository
    extends AbstractRepository<number, WebLogo> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebLogo) private readonly logoModel: Repository<WebLogo>
    ) {
        super(logoModel);
    }

}