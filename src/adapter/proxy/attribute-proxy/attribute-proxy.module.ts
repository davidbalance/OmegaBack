import { Global, Module } from "@nestjs/common";
import { ProfileModule } from "@omega/profile/profile.module";
import { AttributeProxyProvider } from "./attribute-proxy.service";
import { ATTRIBUTE_INTERCEPTOR_TOKEN } from "@shared/shared/nest/interceptors/attribute.interceptor";

@Global()
@Module({
    imports: [
        ProfileModule
    ],
    providers: [AttributeProxyProvider],
    exports: [ATTRIBUTE_INTERCEPTOR_TOKEN]
})
export class AttributeProxyModule { }