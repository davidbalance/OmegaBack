import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Token } from "../entities/token.entity";
import { AbstractRepository } from "@/shared/sql-database/abstract.repository";

@Injectable()
export class TokenRepository extends AbstractRepository<number, Token> {
    constructor(
        @InjectRepository(Token) private readonly tokenModel: Repository<Token>
    ) {
        super(tokenModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Token>): Promise<void> {
        await this.tokenModel.delete(filterOptions);
    }

}