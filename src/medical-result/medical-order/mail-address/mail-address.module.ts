import { Module } from '@nestjs/common';
import { MailAddressService } from './mail-address.service';
import { MailAddressController } from './mail-address.controller';
import { SqlDatabaseModule } from '@/shared';
import { MailAddress } from './entity/mail-address.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([MailAddress])],
  providers: [MailAddressService],
  controllers: [MailAddressController]
})
export class MailAddressModule { }
