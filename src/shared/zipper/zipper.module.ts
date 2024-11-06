import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './zipper.module-definition';
import { ZipperService } from './zipper.service';
import { ArchiverModule } from '../nest-ext/archiver/archiver.module';
import { PathModule } from '../nest-ext/path/path.module';
import { UuidModule } from '../nest-ext/uuid/uuid.module';

@Module({
    imports: [
        ArchiverModule,
        PathModule,
        UuidModule
    ],
    providers: [ZipperService],
    exports: [ZipperService]
})
export class ZipperModule extends ConfigurableModuleClass { }
