import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './zipper.module-definition';
import { ZipperService } from './zipper.service';

@Module({
    providers: [ZipperService],
    exports: [ZipperService]
})
export class ZipperModule extends ConfigurableModuleClass { }
