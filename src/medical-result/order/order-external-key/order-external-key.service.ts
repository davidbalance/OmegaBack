import { AbstractExternalKeyService } from '@/shared';
import { Inject, Injectable } from '@nestjs/common';
import { OrderExternalKey } from './entities/order-external-key.entity';
import { OrderExternalKeyRepository } from './order-external-key.repository';

@Injectable()
export class OrderExternalKeyService extends AbstractExternalKeyService<OrderExternalKey, OrderExternalKeyRepository> {
  constructor(
    @Inject(OrderExternalKeyRepository) private readonly repository: OrderExternalKeyRepository
  ) {
    super(repository);
  }
}
