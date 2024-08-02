import { Module } from '@nestjs/common';
import { DniInterceptor } from './dni.interceptor';
import { UserModule } from '@/user/user/user.module';
import { DataInterceptorService } from './data-interceptor.service';

@Module({
    imports: [UserModule],
    providers: [
        DniInterceptor,
        DataInterceptorService],
    exports: [
        DniInterceptor,
        DataInterceptorService
    ]
})
export class DniInterceptorModule { }
