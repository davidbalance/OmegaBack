import { AbstractExternalKeyService } from "@/shared/external-key";
import { Injectable, Inject } from "@nestjs/common";
import { CompanyExternalKeyRepository } from "../repositories/company-external-key.repository";
import { CompanyExternalKeyEntity } from "../entities/company-external-key.entity";

@Injectable()
export class CompanyExternalKeyService
  extends AbstractExternalKeyService<CompanyExternalKeyEntity, CompanyExternalKeyRepository> {

  constructor(
    @Inject(CompanyExternalKeyRepository) private readonly repository: CompanyExternalKeyRepository
  ) {
    super(repository);
  }
}
