import { AbstractRepository } from "@/shared/sql-database";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalResultSendAttribute } from "../entities/medical-result-send-attribute.entity";

@Injectable()
export class MedicalResultSendAttributeRepository extends AbstractRepository<number, MedicalResultSendAttribute> {

    constructor(
        @InjectRepository(MedicalResultSendAttribute) private readonly attributeModel: Repository<MedicalResultSendAttribute>
    ) {
        super(attributeModel);
    }
}