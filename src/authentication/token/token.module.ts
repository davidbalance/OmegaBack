import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Token } from './entities/token.entity';
import { TokenRepository } from './token.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([Token])],
  controllers: [TokenController],
  providers: [TokenService, TokenRepository]
})
export class TokenModule { }
