import { Reflector } from "@nestjs/core";
import { ExtraAttributeInterceptor } from "./extra-attribute.interceptor";
import { ExtraAttributeInterceptorService } from "./extra-attribute-interceptor.service";
import { TestBed } from "@automock/jest";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";
import { ExtraAttribute } from "@/shared/decorator";

describe('ExtraAttributeInterceptorService', () => {
    let interceptor: ExtraAttributeInterceptor;
    let reflector: jest.Mocked<Reflector>;
    let service: jest.Mocked<ExtraAttributeInterceptorService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExtraAttributeInterceptor).compile();

        interceptor = unit;
        reflector = unitRef.get(Reflector)
        service = unitRef.get(ExtraAttributeInterceptorService)
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('intercept', () => {
        const userId = 1;
        const attributeKey = 'testAttribute';
        const attributeValue = 'testAttributeValue';
        const request = { user: userId };
        const context = {
            switchToHttp: () => ({
                getRequest: () => request,
            }),
            getHandler: () => ({}),
        } as ExecutionContext;
        const next = {
            handle: () => of({}),
        } as CallHandler;

        it('should call getExtraAttribute from ExtraAttributeInterceptorService and update request.user with the attribute value', async () => {
            // Arrange
            reflector.get.mockReturnValueOnce(attributeKey);
            service.getExtraAttribute.mockResolvedValueOnce(attributeValue);

            // Act
            await interceptor.intercept(context, next);

            // Assert
            expect(reflector.get).toHaveBeenCalledWith(ExtraAttribute, context.getHandler());
            expect(service.getExtraAttribute).toHaveBeenCalledWith(userId, attributeKey);
            expect(request.user).toBe(attributeValue);
        });
    });

});