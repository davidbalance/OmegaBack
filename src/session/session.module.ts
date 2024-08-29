import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Session } from './entities/session.entity';
import { SessionRepository } from './respository/session.repository';
import { SessionStrategy } from './strategies/session.strategy';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Session])
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
