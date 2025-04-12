import { AbstractExternalKeyService } from "@/shared/external-key";
import { Injectable, Inject } from "@nestjs/common";
import { JobPositionExternalKey } from "../entities/job-position-external-key.entity";
import { JobPositionExternalKeyRepository } from "../repositories/job-position-external-key.repository";

@Injectable()
export class JobPositionExternalKeyService
  extends AbstractExternalKeyService<JobPositionExternalKey, JobPositionExternalKeyRepository> {

  constructor(
    @Inject(JobPositionExternalKeyRepository) private readonly repository: JobPositionExternalKeyRepository
  ) {
    super(repository);
  }
}