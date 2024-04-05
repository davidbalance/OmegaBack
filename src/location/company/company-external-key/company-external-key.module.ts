import { Module } from '@nestjs/common';
import { CompanyExternalKeyService } from './company-external-key.service';
import { SqlDatabaseModule } from '@/shared';
import { CompanyExternalKey } from './entities/company-external-key.entity';
import { CompanyExternalKeyRepository } from './company-external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CompanyExternalKey])
  ],
  providers: [
    CompanyExternalKeyService,
    CompanyExternalKeyRepository
  ],
  exports: [CompanyExternalKeyService]
})
export class CompanyExternalKeyModule { }
