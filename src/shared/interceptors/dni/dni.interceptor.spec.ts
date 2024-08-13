import { TestBed } from "@automock/jest";
import { DataInterceptorService } from "./data-interceptor.service";
import { DniInterceptor } from "./dni.interceptor";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";

describe('DniInterceptor', () => {
  let interceptor: DniInterceptor;
  let service: jest.Mocked<DataInterceptorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DniInterceptor).compile();

    interceptor = unit;
    service = unitRef.get(DataInterceptorService)
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('intercept', () => {
    const userId = 1;
    const dni = '12345678A';
    const request = { user: userId };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
    const next = {
      handle: () => of({}),
    } as CallHandler;

    it('should call getDni from DataInterceptorService and update request.user with the DNI', async () => {
      // Arrange
      service.getDni.mockResolvedValueOnce(dni);

      // Act
      await interceptor.intercept(context, next);

      // Assert
      expect(service.getDni).toHaveBeenCalledWith(userId);
      expect(request.user).toEqual(dni);
    });
  });
});
