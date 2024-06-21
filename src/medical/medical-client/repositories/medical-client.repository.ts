import { AbstractRepository } from "@/shared";
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

    findOneAndDelete(filterOptions: FindOptionsWhere<MedicalClient>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}