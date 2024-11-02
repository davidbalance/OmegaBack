import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './zipper.module-definition';
import { ZipperService } from './zipper.service';
import { NestArchiverModule } from '../nest-ext/nest-archiver/nest-archiver.module';
import { NestFSModule } from '../nest-ext/nest-fs/nest-fs.module';
import { NestPathModule } from '../nest-ext/nest-path/nest-path.module';

@Module({
    imports: [
        NestArchiverModule,
        NestFSModule,
        NestPathModule
    ],
    providers: [ZipperService],
    exports: [ZipperService]
})
export class ZipperModule extends ConfigurableModuleClass { }
