import { TestBed } from "@automock/jest";
import { ExamTypeOptionService } from "../services/exam-type-option.service";
import { ExamTypeOptionController } from "./exam-type-option.controller";
import { mockExtendedExamTypes } from "../stub/extended-exam-type.stub";

describe('ExamTypeOptionController', () => {
  let controller: ExamTypeOptionController;
  let service: jest.Mocked<ExamTypeOptionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypeOptionController).compile();
    controller = unit;
    service = unitRef.get(ExamTypeOptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {

    const mockedDiseaseGroup = mockExtendedExamTypes();
    const expectedData = { data: mockedDiseaseGroup };

    it('should call the service to find all the options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedDiseaseGroup);

      // Act
      const result = await controller.find();

      // Assert
      expect(result).toEqual(expectedData);
    });
  });
});