import { TestingModule, Test } from "@nestjs/testing";
import { HashType, HashToken } from "./local-hash.dependencies";
import { LocalHashService } from "./local-hash.service";
import { Logger } from "@nestjs/common";
import { InternalError } from "@shared/shared/domain/error";

describe('LocalHashService', () => {
  let service: LocalHashService;
  let hashProp: jest.Mocked<HashType>;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockImplementation(() => { });

    hashProp = {
      genSaltSync: jest.fn(),
      hashSync: jest.fn(),
      compareSync: jest.fn(),
    } as unknown as jest.Mocked<HashType>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalHashService,
        { provide: HashToken, useValue: hashProp },
      ],
    }).compile();

    service = module.get<LocalHashService>(LocalHashService);
  });

  describe('hash', () => {
    it('should hash a value successfully', () => {
      hashProp.genSaltSync.mockReturnValue('mockSalt');
      hashProp.hashSync.mockReturnValue('mockHash');

      const result = service.hash('password');

      expect(hashProp.genSaltSync).toHaveBeenCalled();
      expect(hashProp.hashSync).toHaveBeenCalledWith('password', 'mockSalt');
      expect(result).toBe('mockHash');
    });

    it('should throw an InternalError when hash fails', () => {
      hashProp.genSaltSync.mockReturnValue('mockSalt');
      hashProp.hashSync.mockImplementation(() => { throw new Error() });

      expect(() => service.hash('password')).toThrow(InternalError);
    });
  });

  describe('compare', () => {
    it('should compare a value successfully', () => {
      hashProp.compareSync.mockReturnValue(true);

      const result = service.compare('password', 'hashedPassword');

      expect(hashProp.compareSync).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(result).toBe(true);
    });

    it('should return false when values do not match', () => {
      hashProp.compareSync.mockReturnValue(false);

      const result = service.compare('wrongPassword', 'hashedPassword');

      expect(hashProp.compareSync).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
      expect(result).toBe(false);
    });

    it('should throw an InternalError when compare fails', () => {
      hashProp.compareSync.mockImplementation(() => { throw new Error() });

      expect(() => service.compare('wrongPassword', 'hashedPassword')).toThrow(InternalError);
    });
  });
});