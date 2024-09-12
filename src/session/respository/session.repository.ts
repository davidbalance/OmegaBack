import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { SessionEntity } from "../entities/session.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SessionRepository extends AbstractRepository<number, SessionEntity> {
    constructor(
        @InjectRepository(SessionEntity) private readonly repo: Repository<SessionEntity>
    ) {
        super(repo);
    }
}