import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserRequestDTO, UpdateUserDNIRequestDTO, UpdateUserRequestDTO } from 'src/shared/dtos';

interface UserServiceExtensions<K> {
  /**
   * Creates a user by its given values
   * @param user 
   */
  create(user: CreateUserRequestDTO): Promise<User>;
  /**
   * Retrives all the active users
   */
  readAll(): Promise<User[]>;
  /**
   * Retrive one active user by its given id
   * @param id 
   */
  readOneByID(id: K): Promise<User>;
  /**
   * Retrive one active user by its given DNI
   * @param dni 
   */
  readOneByDNI(dni: string): Promise<User>;
  /**
   * Updates user by its given values
   * @param id 
   * @param user 
   */
  update(id: K, user: UpdateUserRequestDTO): Promise<User>;
  /**
   * Updates ony the DNI
   * @param id 
   * @param user 
   */
  updateDNI(id: K, user: UpdateUserDNIRequestDTO): Promise<User>;
  /**
   * Inactive user by its give id
   * @param id 
   */
  inactive(id: K): Promise<User>;
}

@Injectable()
export class UserService implements UserServiceExtensions<number> {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository
  ) { }

  async create(user: CreateUserRequestDTO): Promise<User> {
    try {
      await this.repository.findOne({ dni: user.dni });
      throw new ConflictException(["DNI already in use"]);
    } catch (error) {
      return this.repository.create(user);
    }
  }

  async readAll(): Promise<User[]> {
    return this.repository.find({ status: true });
  }

  async readOneByID(id: number): Promise<User> {
    return this.repository.findOne({ id, status: true }, { roles: true, permissions: true });
  }

  async readOneByDNI(dni: string): Promise<User> {
    return this.repository.findOne({ dni, status: true }, { roles: true, permissions: true });
  }

  async update(id: number, user: UpdateUserRequestDTO): Promise<User> {
    return this.repository.findOneAndUpdate({ id }, user);
  }

  async updateDNI(id: number, user: UpdateUserDNIRequestDTO): Promise<User> {
    try {
      await this.repository.findOne({ dni: user.dni });
      throw new ConflictException(["DNI already in use"]);
    } catch (error) {
      return this.repository.findOneAndUpdate({ id, status: true }, user);
    }
  }

  async inactive(id: number): Promise<User> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}
