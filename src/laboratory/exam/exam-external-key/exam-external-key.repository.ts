import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { ExamExternalKey } from "./entities/exam-external-key.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ExamExternalKeyRepository extends AbstractRepository<number, ExamExternalKey> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(ExamExternalKey) private readonly keyModel: Repository<ExamExternalKey>
    ) {
        super(keyModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<ExamExternalKey>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}