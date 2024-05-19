import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyRepository } from './api-key.repository';
import { CreateApiKeyRequestDTO, FindOneAndUpdateApiKeyRequestDTO } from './dto';
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

  /**
   * Finds a all the API KEYS assigned to a user
   * @param user 
   * @returns 
   */
  async find(user: number): Promise<{ name: string }[]> {
    const keys = await this.repository.find({
      where: {
        status: true,
        credential: {
          user: user
        }
      },
      relations: {
        credential: true
      },
      select: {
        id: true,
        name: true
      }
    });

    return keys;
  }

  /**
   * Find one and update an API KEY
   * @param param0 
   * @returns 
   */
  async findOneAndUpdate({ id, ...props }: FindOneAndUpdateApiKeyRequestDTO & { id: number }): Promise<{ name: string }> {
    const keys = await this.repository.findOneAndUpdate({ id: id }, { ...props });
    return keys;
  }

  /**
   * Find one and delete an API KEY
   * @param param0 
   * @returns 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }

  /**
   * Creates a new API key with the given options
   * @param param0 
   * @returns The resulting API-KEY
   */
  async create({ user, ...valueKey }: CreateApiKeyRequestDTO & { user: number }): Promise<string> {
    const foundUser = await this.userService.findOneByUser(user);
    const apiKey: string = v4();
    const expiresIn: number = this.configService.get<number>('APIKEY_EXPIRES_IN');
    const expiresAt = dayjs().add(expiresIn, 's').toDate();
    const newApiKey = await this.repository.create({
      ...valueKey,
      value: apiKey,
      credential: foundUser,
      expiresAt: expiresAt
    });
    return newApiKey.value;
  }

  /**
   * Check if the given key is valid
   * @param key 
   * @returns API-KEY owner
   */
  async validate(key: string): Promise<number> {
    const apikey = await this.repository.findOne({ where: { value: key, status: true }, relations: { credential: true } })
    return apikey.credential.user;
  }

  /**
   * Removes all the API-KEYS that have been expired
   */
  async removeExpireKeys(): Promise<void> {
    await this.repository.findAndDelete({ expiresAt: LessThan(dayjs().toDate()) })
  }
}
