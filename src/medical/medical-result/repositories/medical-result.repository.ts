import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalResult } from "../entities/medical-result.entity";

@Injectable()
export class MedicalResultRepository
    extends AbstractRepository<number, MedicalResult> {

    constructor(
        @InjectRepository(MedicalResult) private readonly resultModel: Repository<MedicalResult>
    ) {
        super(resultModel);
    }
}