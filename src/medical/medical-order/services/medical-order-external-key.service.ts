import { AbstractExternalKeyService } from "@/shared/external-key";
import { Injectable, Inject } from "@nestjs/common";
import { MedicalOrderExternalKeyEntity } from "../entities/medical-order-external-key.entity";
import { MedicalOrderExternalKeyRepository } from "../repositories/medical-order-external-key.repository";

@Injectable()
export class MedicalOrderExternalKeyService
  extends AbstractExternalKeyService<MedicalOrderExternalKeyEntity, MedicalOrderExternalKeyRepository> {
  constructor(
    @Inject(MedicalOrderExternalKeyRepository) private readonly repository: MedicalOrderExternalKeyRepository
  ) {
    super(repository);
  }
}
