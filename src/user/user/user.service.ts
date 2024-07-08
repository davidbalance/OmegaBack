import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEvent, UserRemoveEvent, UserUpdateEvent } from '@/shared';
import { Not } from 'typeorm';
import { UserExtraAttributeService } from './services/user-extra-attributes.service';
import { UserExtraAttribute } from './entities/user-extra-attribute';
import { PATCHUserRequestDto, POSTUserRequestDto } from './dtos/user.request.dto';

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
    @Inject(UserExtraAttributeService) private readonly extraAttribute: UserExtraAttributeService,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  /**
   * Crea un usuario.
   * @param param0 
   * @returns 
   */
  async create({ dni, email, ...data }: POSTUserRequestDto): Promise<User> {
    try {
      await this.repository.findOne({ where: [{ dni: dni }, { email: email }] });
      const conflictMessage = ['DNI or Email already un use', JSON.stringify({ dni, email })];
      Logger.warn(conflictMessage);
      throw new ConflictException(conflictMessage);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = await this.repository.create({ dni, email, ...data });
        return newUser;
      }
      throw error;
    }
  }

  /**
   * Encuantra todos los usuarios activos menos el usuario con el identificador unico indicado.
   * @param not 
   * @returns 
   */
  async find(not: number = -1): Promise<User[]> {
    return this.repository.find({
      where: {
        status: true,
        hasCredential: true,
        id: Not(not)
      },
      select: {
        id: true,
        dni: true,
        email: true,
        name: true,
        lastname: true
      },
      cache: 1000 * 900
    });
  }

  /**
   * Encuentra un usuario en base a su identificador unico.
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id: id }, relations: { extraAttributes: true } });
  }

  /**
   * Encuentra un usuario en base a su dni.
   * @param dni 
   * @returns 
   */
  async findOneByDni(dni: string): Promise<User> {
    return this.repository.findOne({ where: { dni: dni }, relations: { extraAttributes: true } });
  }

  /**
   * Encuentra un usuario y lo modifica.
   * @param id 
   * @param user 
   * @returns 
   */
  async findOneAndUpdate(id: number, user: PATCHUserRequestDto): Promise<User> {
    const updateUser = await this.repository.findOneAndUpdate({ id }, user);
    this.eventEmitter.emit(UserEvent.UPDATE, new UserUpdateEvent({ id, email: user.email }));
    return updateUser;
  }

  /**
   * Encuentra un usuario y lo desactiva.
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
    this.eventEmitter.emit(UserEvent.REMOVE, new UserRemoveEvent({ id }));
  }

  /**
   * Encuentra un atributo extra dentro de un usuario usando su identificador unico.
   * @param id 
   * @param name 
   * @returns 
   */
  async findExtraAttribute(id: number, name: string): Promise<UserExtraAttribute> {
    const user = await this.repository.findOne({ where: { id }, relations: { extraAttributes: true } });
    const extra = user.extraAttributes.find((e) => e.name === name);
    return extra;
  }

  /**
   * Crea un atributo unico y lo asocia al usuario.
   * @param id 
   * @param param1 
   */
  async assignExtraAttribute(id: number, { name, value }: { name: string, value: string }): Promise<void> {
    const user = await this.repository.findOne({ where: { id }, relations: { extraAttributes: true } });
    const selectedAttribute = user.extraAttributes.find((e) => e.name === name);
    if (selectedAttribute) {
      this.extraAttribute.update(selectedAttribute.id, value);
    } else {
      const newAttribute = await this.extraAttribute.create(name, value);
      this.repository.findOneAndUpdate({ id }, { extraAttributes: [...user.extraAttributes, newAttribute] });
    }
  }
}
