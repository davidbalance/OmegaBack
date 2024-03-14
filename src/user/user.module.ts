import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SqlDatabaseModule } from 'src/shared';
import { User } from './entities/user.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule { }
