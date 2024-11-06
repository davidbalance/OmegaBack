import { FSModule } from "@/shared/nest-ext/fs/fs.module";
import { Global, Module } from "@nestjs/common";
import { FILE_SYSTEM } from "../inject-token";
import { LocalFileSystemService } from "./local.service";
import { PathModule } from "@/shared/nest-ext/path/path.module";
import { UuidModule } from "@/shared/nest-ext/uuid/uuid.module";

@Global()
@Module({
    imports: [
        FSModule,
        PathModule,
        UuidModule
    ],
    providers: [{
        provide: FILE_SYSTEM,
        useClass: LocalFileSystemService
    }],
    exports: [FILE_SYSTEM]
})
export class LocalFileSystemModule { }