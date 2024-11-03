import { Test, TestingModule } from '@nestjs/testing';
import { PdfManagerService } from '../pdf-manager.service';
import { TestBed } from '@automock/jest';

describe('PdfManagerService', () => {
  let service: PdfManagerService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(PdfManagerService).compile();

    service = unit
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
