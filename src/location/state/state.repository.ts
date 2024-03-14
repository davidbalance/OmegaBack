import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/shared";
import { State } from "./entities/state.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StateRepository extends AbstractRepository<number, State> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(State) private readonly stateModel: Repository<State>
    ) {
        super(stateModel)
    }
}