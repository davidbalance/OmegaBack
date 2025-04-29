import { Injectable, Provider } from "@nestjs/common";
import { UserAttributeFindOneQuery } from "@omega/profile/application/query/user/user-attribute-find-one.query";
import { InjectQuery } from "@omega/profile/nest/inject/query.inject";
import { ATTRIBUTE_INTERCEPTOR_TOKEN, AttributeInterceptorService } from "@shared/shared/nest/interceptors/attribute.interceptor";

@Injectable()
export class AttributeProxyService implements AttributeInterceptorService {

    constructor(
        @InjectQuery('UserAttributeFindOne') private readonly attributeQuery: UserAttributeFindOneQuery
    ) { }

    async findAttribute(userId: string, name: string): Promise<string> {
        const value = await this.attributeQuery.handleAsync({ attributeName: name, userId: userId });
        return value.attributeValue;
    }
}

export const AttributeProxyProvider: Provider = {
    provide: ATTRIBUTE_INTERCEPTOR_TOKEN,
    useClass: AttributeProxyService
}