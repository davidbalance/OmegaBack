import { Module } from '@nestjs/common';
import { OrderExternalKeyService } from './order-external-key.service';
import { OrderExternalKeyRepository } from './order-external-key.repository';
import { SqlDatabaseModule } from '@/shared';
import { OrderExternalKey } from './entities/order-external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([OrderExternalKey])
  ],
  providers: [
    OrderExternalKeyService,
    OrderExternalKeyRepository
  ],
  exports: [OrderExternalKeyService]
})
export class OrderExternalKeyModule { }
