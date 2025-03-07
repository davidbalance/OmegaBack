/* eslint-disable @typescript-eslint/unbound-method */
import { JwtService } from "@nestjs/jwt";
import { LocalJwtAccessService } from "./local-jwt-access.service";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { Logger } from "@nestjs/common";
import { InternalError } from "@shared/shared/domain/error";

describe('LocalJwtAccessService', () => {
  let service: LocalJwtAccessService;
  let jwt: jest.Mocked<JwtService>;
  let config: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });

    jwt = { sign: jest.fn(), decode: jest.fn() } as unknown as jest.Mocked<JwtService>;
    config = { getOrThrow: jest.fn() } as unknown as jest.Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalJwtAccessService,
        { provide: JwtService, useValue: jwt },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();

    service = module.get<LocalJwtAccessService>(LocalJwtAccessService);
  });

  describe('createJwt', () => {
    it('should create a JWT successfully', () => {
      config.getOrThrow.mockReturnValue({ access_expires_in: '1h', access_secret: 'secret' });
      jwt.sign.mockReturnValue('mockJwt');

      const result = service.createJwt({ userId: 1 });

      expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, { expiresIn: '1h', secret: 'secret' });
      expect(result).toBe('mockJwt');
    });

    it('should throw an InternalError if configuration is missing', () => {
      config.getOrThrow.mockImplementation(() => {
        throw new Error('Config Missing');
      });

      expect(() => service.createJwt({ userId: 1 })).toThrow(InternalError);
    });

    it('should throw an InternalError if sign fails', () => {
      config.getOrThrow.mockReturnValue({ access_expires_in: '1h', access_secret: 'secret' });
      jwt.sign.mockImplementation(() => {
        throw new Error();
      });

      expect(() => service.createJwt({ userId: 1 })).toThrow(InternalError);
    });
  });

  describe('validateJwt', () => {
    it('should validate a JWT successfully', () => {
      jwt.decode.mockReturnValue({ userId: 1 });

      const result = service.validateJwt('mockJwt');

      expect(jwt.decode).toHaveBeenCalledWith('mockJwt');
      expect(result).toEqual({ userId: 1 });
    });

    it('should throw an InternalError if validation fails', () => {
      jwt.decode.mockImplementation(() => {
        throw new Error();
      });

      expect(() => service.validateJwt('mockJwt')).toThrow(InternalError);
    });
  });
});
