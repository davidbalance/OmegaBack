import { Inject, Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenRepository } from './token.repository';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {

  constructor(
    @Inject(TokenRepository) private readonly repository: TokenRepository
  ) { }

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    return await this.repository.create(createTokenDto);
  }

  async findAll(): Promise<Token[]> {
    return await this.repository.find({});
  }

  async findOne(id: number): Promise<Token> {
    return await this.repository.findOne({ id })
  }

  async update(id: number, updateTokenDto: UpdateTokenDto): Promise<Token> {
    return await this.repository.findOneAndUpdate({ id }, updateTokenDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
