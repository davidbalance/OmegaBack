import { Module } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { CorporativeGroupController } from './corporative-group.controller';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CorporativeGroupRepository } from './corporative-group.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([CorporativeGroup])],
  controllers: [CorporativeGroupController],
  providers: [CorporativeGroupService, CorporativeGroupRepository]
})
export class CorporativeGroupModule { }
