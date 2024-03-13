import { AbstractRepository } from "src/shared";
import { Exam } from "./entities/exam.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ExamRepository extends AbstractRepository<number, Exam>{
    protected logger: Logger = new Logger();
    constructor(
        @InjectRepository(Exam) private readonly examModel: Repository<Exam>
    ) {
        super(examModel)
    }
}