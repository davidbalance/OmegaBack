import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamSubtypeExternalKey } from "../entities/exam-subtype-external-key.entity";

@Injectable()
export class ExamSubtypeExternalKeyRepository extends AbstractRepository<number, ExamSubtypeExternalKey> {
    constructor(
        @InjectRepository(ExamSubtypeExternalKey) private readonly keyModel: Repository<ExamSubtypeExternalKey>
    ) {
        super(keyModel);
    }
}