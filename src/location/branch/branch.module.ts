import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { SqlDatabaseModule } from 'src/shared';

@Module({
  imports: [SqlDatabaseModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule { }
