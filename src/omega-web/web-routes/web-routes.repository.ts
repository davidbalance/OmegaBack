import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { WebRoute } from "./entities/web-route.entity";

@Injectable()
export class WebRoutesRepository extends AbstractRepository<number, WebRoute> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(WebRoute) private readonly routeModel: Repository<WebRoute>
    ) {
        super(routeModel);
    }

    async findMany(ids: number[]): Promise<WebRoute[]> {
        return await this.routeModel.find({ where: { id: In(ids) } });
    }

}