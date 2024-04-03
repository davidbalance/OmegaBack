import { ConflictException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserCredentialRepository } from './user-credential.repository';
import { UserCredential } from './entities/user-credential.entity';
import * as bcrypt from 'bcrypt';
import { CreateCredentialRequestDTO } from './dtos';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CredentialCreateEvent, CredentialEvent, UserEvent, UserRemoveEvent, UserUpdateEvent } from '@/shared';

@Injectable()
export class UserCredentialService {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  async create({ email, ...data }: CreateCredentialRequestDTO): Promise<UserCredential> {
    try {
      await this.repository.findOne({ where: { email } });
      const conflictMessage = ['Email already', JSON.stringify({ email })];
      Logger.error(conflictMessage);
      throw new ConflictException(conflictMessage)
    } catch (error) {
      const hashedPassword = this.hashPassword(data.password);
      const credential: UserCredential = await this.repository.create({ ...data, password: hashedPassword, email: email });
      this.eventEmitter.emit(CredentialEvent.CREATE, new CredentialCreateEvent({ id: data.user }));
      return credential;
    }
  }

  async findOneCredentialAndUpdatePassword(username: string, password: string): Promise<UserCredential> {
    const hashedPassword = this.hashPassword(password);
    const credentials = await this.repository.findOneAndUpdate({ email: username }, { password: hashedPassword });
    return credentials;
  }

  async validateCredentials(username: string, password: string): Promise<number> {
    const credentials = await this.repository.findOne({ where: { email: username, status: true }, select: { user: true, password: true } });
    const passwordIsValid = this.validatePassword(password, credentials.password);
    if (!passwordIsValid) throw new UnauthorizedException(["Wrong credentials"]);
    return credentials.user;
  }

  @OnEvent(UserEvent.UPDATE)
  async findOneCredentialAndUpdateUsername({ updateEvent }: UserUpdateEvent): Promise<void> {
    const { id, email } = updateEvent;
    const credential = await this.repository.findOne({ where: { user: id }, select: { email: true } });
    if (credential.email !== email) {
      await this.repository.findOneAndUpdate({ id }, { email: email });
    }
  }

  @OnEvent(UserEvent.REMOVE)
  async findOneCredentialAndDelete({ removeEvent }: UserRemoveEvent): Promise<void> {
    const { id } = removeEvent;
    await this.repository.findOneAndDelete({ user: id });
  }

  private validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  private hashPassword(password: string): string {
    const saltOrRounds = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, saltOrRounds);
  }
}
