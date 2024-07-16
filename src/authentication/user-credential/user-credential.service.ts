import { ConflictException, ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { UserCredentialRepository } from './user-credential.repository';
import { UserCredential } from './entities/user-credential.entity';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CredentialCreateEvent, CredentialEvent } from '@/shared';
import { POSTCredentialRequestDto } from './dtos/user-credential.request.dto';

@Injectable()
export class UserCredentialService {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  /**
   * Crea credenciales para un usuario.
   * @param param0 
   * @returns 
   */
  async create({ email, ...data }: POSTCredentialRequestDto): Promise<UserCredential> {
    try {
      await this.repository.findOne({ where: { email } });
      const conflictMessage = ['Email already', JSON.stringify({ email })];
      Logger.error(conflictMessage);
      throw new ConflictException(conflictMessage);
    } catch (error) {
      const hashedPassword = this.hashPassword(data.password);
      const credential: UserCredential = await this.repository.create({ ...data, password: hashedPassword, email: email });
      this.eventEmitter.emit(CredentialEvent.CREATE, new CredentialCreateEvent(data.user));
      return credential;
    }
  }

  /**
   * Busca una credencial y actualiza la contraseña.
   * @param username 
   * @param password 
   * @returns 
   */
  async findOneCredentialAndUpdatePassword(username: string, password: string): Promise<UserCredential> {
    const hashedPassword = this.hashPassword(password);
    const credentials = await this.repository.findOneAndUpdate({ email: username }, { password: hashedPassword });
    return credentials;
  }

  /**
   * Valida el usuario y contraseña.
   * @param username 
   * @param password 
   * @returns 
   */
  async validateCredentials(username: string, password: string): Promise<number> {
    const credentials = await this.repository.findOne({ where: { email: username, status: true }, select: { user: true, password: true } });
    const passwordIsValid = this.validatePassword(password, credentials.password);
    if (!passwordIsValid) throw new ForbiddenException(["Wrong credentials"]);
    return credentials.user;
  }

  /**
   * Encuentra credenciales usando al usuario.
   * @param user 
   * @returns 
   */
  async findOneByUser(user: number): Promise<UserCredential> {
    return this.repository.findOne({ where: { user: user } });
  }

  /**
   * Valida la contraseña.
   * @param password 
   * @param hash 
   * @returns 
   */
  private validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Encripta la contraseña antes de guardar o actualizarla.
   * @param password 
   * @returns 
   */
  private hashPassword(password: string): string {
    const saltOrRounds = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, saltOrRounds);
  }
}
