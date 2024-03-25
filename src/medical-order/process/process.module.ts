import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { SqlDatabaseModule } from '@/shared';
import { Process } from './entities/process.entity';
import { ProcessRepository } from './process.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([Process])],
  controllers: [ProcessController],
  providers: [ProcessService, ProcessRepository],
  exports: [ProcessService]
})
export class ProcessModule { }
