import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { ExamSubtypeEntity } from "../entities/exam-subtype.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ExamSubtypeRepository extends AbstractRepository<number, ExamSubtypeEntity> {
    constructor(
        @InjectRepository(ExamSubtypeEntity) private readonly repo: Repository<ExamSubtypeEntity>
    ) {
        super(repo);
    }
}