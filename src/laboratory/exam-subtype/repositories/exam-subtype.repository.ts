import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { ExamSubtype } from "../entities/exam-subtype.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ExamSubtypeRepository extends AbstractRepository<number, ExamSubtype> {
    constructor(
        @InjectRepository(ExamSubtype) private readonly repo: Repository<ExamSubtype>
    ) {
        super(repo);
    }
}