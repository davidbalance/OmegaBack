import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from '../respository/session.repository';
import { PatchSessionRequestDto } from '../dto/request/patch.session.request.dto';
import { PostSessionRequestDto } from '../dto/request/post.session.request.dto';
import { v4 } from 'uuid';

@Injectable()
export class SessionService {

  constructor(
    @Inject(SessionRepository) private readonly repository: SessionRepository
  ) { }

  async create(data: PostSessionRequestDto): Promise<string> {
    const uid = v4();
    await this.repository.create({ ...data, session: uid });
    return uid;
  }

  async findOne(session: string): Promise<{ token: string; refresh: string; }> {
    const currentSession = await this.repository.findOne({ where: { session }, select: { token: true, refresh: true } });
    return currentSession;
  }

  async updateOne(session: string, tokens: PatchSessionRequestDto): Promise<void> {
    await this.repository.findOneAndUpdate({ session }, { ...tokens });
  }

  async deleteOne(session: string): Promise<void> {
    await this.repository.findOneAndDelete({ session });
  }
}
