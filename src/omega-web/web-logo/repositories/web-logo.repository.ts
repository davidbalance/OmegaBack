import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WebLogo } from "../entities/web-logo.entity";

@Injectable()
export class WebLogoRepository
    extends AbstractRepository<number, WebLogo> {

    constructor(
        @InjectRepository(WebLogo) private readonly logoModel: Repository<WebLogo>
    ) {
        super(logoModel);
    }

}