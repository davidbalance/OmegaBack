import { Global, Module } from "@nestjs/common";
import { ProfileModule } from "@omega/profile/profile.module";
import { CORPORATIVE_FILTER_INTERCEPTOR_TOKEN } from "@shared/shared/nest/interceptors/corporative-filter.interceptor";
import { CorporativeFilterProxyProvider } from "./corporative-filter-proxy.service";

@Global()
@Module({
    imports: [
        ProfileModule
    ],
    providers: [CorporativeFilterProxyProvider],
    exports: [CORPORATIVE_FILTER_INTERCEPTOR_TOKEN]
})
export class CorporativeFilterProxyModule { }