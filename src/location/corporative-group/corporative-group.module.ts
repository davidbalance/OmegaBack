import { Module } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { CorporativeGroupController } from './corporative-group.controller';

@Module({
  controllers: [CorporativeGroupController],
  providers: [CorporativeGroupService]
})
export class CorporativeGroupModule {}
