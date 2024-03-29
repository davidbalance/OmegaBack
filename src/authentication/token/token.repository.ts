import { AbstractRepository } from "src/shared";
import { Token } from "./entities/token.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class TokenRepository extends AbstractRepository<number, Token> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Token) private readonly tokenModel: Repository<Token>
    ) {
        super(tokenModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Token>): Promise<void> {
        await this.tokenModel.delete(filterOptions);
    }

}