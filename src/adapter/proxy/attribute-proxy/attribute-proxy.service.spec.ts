import { UserAttributeFindOneQuery } from "@omega/profile/application/query/user/user-attribute-find-one.query";
import { AttributeProxyService } from "./attribute-proxy.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UserAttributeFindOneQueryToken } from "@omega/profile/nest/inject/query.inject";
import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";

describe("AttributeProxyService", () => {
    let service: AttributeProxyService;
    let attributeQuery: jest.Mocked<UserAttributeFindOneQuery>;

    beforeEach(async () => {
        attributeQuery = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<UserAttributeFindOneQuery>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AttributeProxyService,
                { provide: UserAttributeFindOneQueryToken, useValue: attributeQuery }
            ]
        }).compile();

        service = module.get<AttributeProxyService>(AttributeProxyService);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findAttribute', () => {
        const attributeName = 'testAttr';
        const userId = 'user123';
        const mockedAttribute = { attributeValue: 'value' } as unknown as UserAttributeModel;

        it('should call attributeQuery.handleAsync with correct parameters', async () => {
            attributeQuery.handleAsync.mockResolvedValue(mockedAttribute);

            await service.findAttribute(userId, attributeName);

            expect(attributeQuery.handleAsync).toHaveBeenCalledWith({ attributeName, userId });
        });

        it('should return the attributeValue from the query result', async () => {
            attributeQuery.handleAsync.mockResolvedValue(mockedAttribute);

            const value = await service.findAttribute(userId, attributeName);

            expect(value).toBe(mockedAttribute.attributeValue);
        });
    });
});