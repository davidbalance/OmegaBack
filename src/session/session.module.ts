import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { SessionEntity } from './entities/session.entity';
import { SessionRepository } from './respository/session.repository';
import { SessionStrategy } from './strategies/session.strategy';
import { NestUuidModule } from '@/shared/nest-ext/nest-uuid/nest-uuid.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      SessionEntity
    ]),
    NestUuidModule
  ],
  controllers: [
    SessionController
  ],
  providers: [
    SessionRepository,
    SessionService,
    SessionStrategy
  ]
})
export class SessionModule { }
