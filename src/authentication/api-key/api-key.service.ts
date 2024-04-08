import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyRepository } from './api-key.repository';
import { ApiKey } from './entities/api-key.entity';
import { CreateApiKeyRequestDTO } from './dto';
import { UserService } from '@/user/user/user.service';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { LessThan } from 'typeorm';
import { UserCredentialService } from '../user-credential/user-credential.service';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject(ApiKeyRepository) private readonly repository: ApiKeyRepository,
    @Inject(UserCredentialService) private readonly userService: UserCredentialService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) { }

  async create({ user, ...valueKey }: CreateApiKeyRequestDTO): Promise<string> {
    const foundUser = await this.userService.findOneByUser(user);
    const apiKey: string = v4();
    const expiresIn: number = this.configService.get<number>('apikey.expiresIn');
    const expiresAt = dayjs().add(expiresIn, 's').toDate();
    const newApiKey = await this.repository.create({
      ...valueKey,
      value: apiKey,
      credential: foundUser,
      expiresAt: expiresAt
    });
    return newApiKey.value;
  }

  async validate(key: string): Promise<number> {
    const apikey = await this.repository.findOne({ where: { value: key, status: true }, relations: { credential: true } })
    return apikey.credential.user;
  }

  async removeExpireKeys(): Promise<void> {
    await this.repository.findAndDelete({ expiresAt: LessThan(dayjs().toDate()) })
  }
}
