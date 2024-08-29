import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Session } from "../entities/session.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SessionRepository extends AbstractRepository<number, Session> {
    constructor(
        @InjectRepository(Session) private readonly repo: Repository<Session>
    ) {
        super(repo);
    }
}