import { TestBed } from '@automock/jest';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from '../services/checklist.service';
import { mockChecklist } from '../stub/checklist.stub';
import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { PatchChecklistItemStaus } from '../dto/request/checklist-item-status.patch.dto';
import { GetChecklistDTO } from '../dto/response/checklist.get.dto';

describe('ChecklistController', () => {
  let controller: ChecklistController;
  let service: jest.Mocked<ChecklistService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ChecklistController).compile();

    controller = unit;
    service = unitRef.get(ChecklistService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('findChecklist', () => {

    const id: number = 1;
    const mockedChecklist = mockChecklist();
    const expectedValue = mockedChecklist;

    it('should retrive a checklist', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedChecklist);

      // Act
      const result = await controller.findChecklist(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('findChecklistPDF', () => {

    const id: number = 1;
    const mockBuffer = Buffer.from('Mocked value');
    const response = { set: jest.fn() } as unknown as Response;

    it('should retrive a checklist pdf', async () => {
      // Arrange
      service.download.mockResolvedValue(mockBuffer);

      // Act
      const result = await controller.findChecklistPDF(id, response);

      // Assert
      expect(service.download).toHaveBeenCalledWith(id);
      expect(response.set).toHaveBeenCalledWith({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="checklist.pdf"',
      });
      expect(result).toBeInstanceOf(StreamableFile);
    });
  });

  describe('updateItemStatus', () => {

    const id: number = 1;
    const body: PatchChecklistItemStaus = { status: true };

    it('should update the item checklist status from the checklist', async () => {
      // Arrange
      service.updateItemStatus.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateItemStatus(id, body);

      // Assert
      expect(service.updateItemStatus).toHaveBeenCalledWith(id, body.status);
    });
  });

});
