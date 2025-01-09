import { Inject, Injectable } from "@nestjs/common";
import { AreaRepository } from "../repositories/area.repository";
import { ExtendedArea } from "../dtos/response/extended-area.base.dto";

@Injectable()
export class AreaOptionService {
    constructor(
        @Inject(AreaRepository) private readonly repository: AreaRepository
    ) { }

    async find(): Promise<ExtendedArea[]> {
        return this.repository.find({
            where: { status: true }
        });
    }
}