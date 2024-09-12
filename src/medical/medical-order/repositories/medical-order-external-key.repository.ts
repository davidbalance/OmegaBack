import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalOrderExternalKeyEntity } from "../entities/medical-order-external-key.entity";

@Injectable()
export class MedicalOrderExternalKeyRepository
    extends AbstractRepository<number, MedicalOrderExternalKeyEntity> {

    constructor(
        @InjectRepository(MedicalOrderExternalKeyEntity) private readonly keyModel: Repository<MedicalOrderExternalKeyEntity>
    ) {
        super(keyModel);
    }
}