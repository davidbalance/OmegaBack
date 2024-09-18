import { Base64Service } from './base64.service';
import { TestBed } from '@automock/jest';

describe('Base64Service', () => {
  let service: Base64Service;

  beforeEach(async () => {
    const { unit } = TestBed.create(Base64Service).compile();

    service = unit;
  });

  describe('toBuffer', () => {
    it('should convert base64 string to buffer', () => {
      const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HA6LyAAAAAXZyWFlaY29sbwAAAACpQdSJQEAABwAAAAAgCAYAAA2xpUlAAAAABJRU5ErkJggg==';
      const buffer = service.toBuffer(base64String);
      expect(buffer).toBeInstanceOf(Buffer);
    });

    it('should remove data URL prefix before converting to buffer', () => {
      const base64String = 'data:application/pdf;base64,JVBERi0xLjMKJcfsf/A==';
      const expectedBase64String = 'JVBERi0xLjMKJcfsf/A=';
      const buffer = service.toBuffer(base64String);
      expect(buffer.toString('base64')).toBe(expectedBase64String);
    });
  });
});
