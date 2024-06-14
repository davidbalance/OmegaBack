import { AbstractRepository } from "src/shared";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { MedicalResult } from "./entities/result.entity";

@Injectable()
export class MedicalResultRepository
    extends AbstractRepository<number, MedicalResult> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(MedicalResult) private readonly resultModel: Repository<MedicalResult>
    ) {
        super(resultModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<MedicalResult>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}