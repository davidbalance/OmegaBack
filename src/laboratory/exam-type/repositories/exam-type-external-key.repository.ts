import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamTypeExternalKey } from "../entities/exam-type-external-key.entity";

@Injectable()
export class ExamTypeExternalKeyRepository extends AbstractRepository<number, ExamTypeExternalKey> {
    constructor(
        @InjectRepository(ExamTypeExternalKey) private readonly keyModel: Repository<ExamTypeExternalKey>
    ) {
        super(keyModel);
    }
}