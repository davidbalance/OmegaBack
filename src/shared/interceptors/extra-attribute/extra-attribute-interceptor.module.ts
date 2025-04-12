import { Module } from "@nestjs/common";
import { ExtraAttributeInterceptor } from "./extra-attribute.interceptor";
import { ExtraAttributeInterceptorService } from "./extra-attribute-interceptor.service";
import { UserModule } from "@/user/user/user.module";

@Module({
    imports: [UserModule],
    providers: [ExtraAttributeInterceptor, ExtraAttributeInterceptorService],
    exports: [ExtraAttributeInterceptor, ExtraAttributeInterceptorService]
})
export class ExtraAttributeInterceptorModule { }