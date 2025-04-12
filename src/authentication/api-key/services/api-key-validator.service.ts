import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';

@Injectable()
export class ApiKeyValidatorService {
  constructor(
    @Inject(ApiKeyRepository) private readonly repository: ApiKeyRepository) { }

  async validate(key: string): Promise<number> {
    const apikey = await this.repository.findOne({ where: { value: key, status: true }, relations: { credential: true } })
    return apikey.credential.user;
  }
}
