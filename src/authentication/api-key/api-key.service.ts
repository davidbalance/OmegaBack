import { Inject, Injectable } from '@nestjs/common';
import { ApiKeyRepository } from './api-key.repository';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { LessThan } from 'typeorm';
import { UserCredentialService } from '../user-credential/user-credential.service';
import { PATCHApiKeyRequestDto, POSTApiKeyRequestDto } from './dto/api-key.request.dto';
import { POSTApiKeyResponseDto } from './dto/api-key.response.dto';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject(ApiKeyRepository) private readonly repository: ApiKeyRepository,
    @Inject(UserCredentialService) private readonly userService: UserCredentialService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) { }

  /**
   * Retorna todas las apikey asociadas a un usuario.
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
   * Crea una nueva apikey.
   * @param param0 
   * @returns 
   */
  async create({ user, ...valueKey }: POSTApiKeyRequestDto & { user: number }): Promise<POSTApiKeyResponseDto> {
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
    return { ...newApiKey, apikey: apiKey };
  }

  /**
   * Encuentra un apikey dado su identificador unico y lo actualiza.
   * @param param0 
   * @returns 
   */
  async findOneAndUpdate({ id, ...props }: PATCHApiKeyRequestDto & { id: number }): Promise<{ name: string }> {
    const keys = await this.repository.findOneAndUpdate({ id: id }, { ...props });
    return keys;
  }

  /**
   * Encuentra un apikey dado su identificador unico y lo desactiva.
   * @param param0 
   * @returns 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }

  /**
   * Verifica que el apikey exista y sea valido.
   * @param key 
   * @returns
   */
  async validate(key: string): Promise<number> {
    const apikey = await this.repository.findOne({ where: { value: key, status: true }, relations: { credential: true } })
    return apikey.credential.user;
  }

  /**
   * Remueve todos los apikey que se encuentren expirados.
   */
  async removeExpireKeys(): Promise<void> {
    await this.repository.findAndDelete({ expiresAt: LessThan(dayjs().toDate()) })
  }
}
