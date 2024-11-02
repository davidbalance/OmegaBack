import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { UserCredentialService } from '../../user-credential/services/user-credential.service';
import { PostApiKeyRequestDto } from '../dtos/request/post.api-key.request.dto';
import { ApiKey } from '../entities/api-key.entity';
import { PatchApiKeyRequestDto } from '../dtos/request/patch.api-key.request.dto';
import { NEST_UUID } from '@/shared/nest-ext/nest-uuid/inject-token';
import { NestUuid } from '@/shared/nest-ext/nest-uuid/nest-uuid.type';

@Injectable()
export class ApiKeyManagementService {
  constructor(
    @Inject(ApiKeyRepository) private readonly repository: ApiKeyRepository,
    @Inject(UserCredentialService) private readonly credentialService: UserCredentialService,
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(NEST_UUID) private readonly uuid: NestUuid,
  ) { }

  async create(id: number, { name }: PostApiKeyRequestDto): Promise<ApiKey> {
    const foundCredential = await this.credentialService.findOneByUser(id);
    const apiKey: string = this.uuid.v4();
    const expiresIn: number = this.configService.get<number>('APIKEY_EXPIRES_IN');
    const expiresAt = dayjs().add(expiresIn, 's').toDate();
    const newApiKey = await this.repository.create({
      name: name,
      value: apiKey,
      credential: foundCredential,
      expiresAt: expiresAt
    });
    return newApiKey;
  }

  async findAll(user: number): Promise<{ name: string }[]> {
    const keys = await this.repository.find({
      where: {
        status: true,
        credential: { user }
      },
      relations: { credential: true },
      select: { id: true, name: true }
    });

    return keys;
  }

  async updateOne(id: number, data: PatchApiKeyRequestDto): Promise<{ name: string }> {
    const key = await this.repository.findOneAndUpdate({ id: id }, data);
    return key;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}
