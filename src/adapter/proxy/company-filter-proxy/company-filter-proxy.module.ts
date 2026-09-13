import { Global, Module } from "@nestjs/common";
import { ProfileModule } from "@omega/profile/profile.module";
import { COMPANY_FILTER_INTERCEPTOR_TOKEN } from "@shared/shared/nest/interceptors/company-filter.interceptor";
import { CompanyFilterProxyProvider } from "./company-filter-proxy.service";

@Global()
@Module({
    imports: [
        ProfileModule
    ],
    providers: [CompanyFilterProxyProvider],
    exports: [COMPANY_FILTER_INTERCEPTOR_TOKEN]
})
export class CompanyFilterProxyModule { }