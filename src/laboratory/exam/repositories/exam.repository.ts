import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exam } from "../entities/exam.entity";

@Injectable()
export class ExamRepository extends AbstractRepository<number, Exam>{
    constructor(
        @InjectRepository(Exam) private readonly examModel: Repository<Exam>
    ) {
        super(examModel)
    }
}