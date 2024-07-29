import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { MedicalClient } from "../entities/medical-client.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MedicalClientRepository extends AbstractRepository<number, MedicalClient> {

    protected logger: Logger;

    constructor(
        @InjectRepository(MedicalClient) private readonly repo: Repository<MedicalClient>
    ) {
        super(repo);
    }
}