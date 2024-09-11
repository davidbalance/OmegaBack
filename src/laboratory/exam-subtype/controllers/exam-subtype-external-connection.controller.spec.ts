import { TestBed } from "@automock/jest";
import { ExamSubtypeExternalConnectionController } from "./exam-subtype-external-connection.controller";

/* import { TestBed } from "@automock/jest";
import { ExamSubtypeExternalConnectionService } from "../services/exam-subtype-external-connection.service";
import { ExamSubtypeExternalConnectionController } from "./exam-subtype-external-connection.controller";
import { PostExamSubtypeRequestDto } from "../dtos/request/exam-subtype.post.request.dto";
import { mockExamsSubtype } from "../stub/exam-subtype.stub";
import { PostExamSubtypeResponseDto } from "../dtos/response/post.exam-subtype.response.dto";
import { PatchExamSubtypeExternalRequestDto } from "../dtos/request/external-exam-subtype.patch.request.dto";
import { PatchExamSubtypeResponseDto } from "../dtos/response/patch.exam-subtype.response.dto";
 */
describe('ExamSubtypeExternalConnectionController', () => {
    let controller: ExamSubtypeExternalConnectionController;
    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamSubtypeExternalConnectionController).compile();

        controller = unit;
    });

    it('', () => {
        expect(controller).toBeDefined();
    });
    /*     let service: jest.Mocked<ExamSubtypeExternalConnectionService>;
    
        beforeEach(async () => {
            const { unit, unitRef } = TestBed.create(ExamSubtypeExternalConnectionController).compile();
    
            controller = unit;
            service = unitRef.get(ExamSubtypeExternalConnectionService);
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        describe('create', () => {
            const source = 'source';
            const key = 'key';
            const mockDto: PostExamSubtypeRequestDto = {
                name: 'New Exam Subtype',
                type: 1,
            };
            const mockExamSubtypeData = mockExamsSubtype();
            const mockResponse: PostExamSubtypeResponseDto = mockExamSubtypeData;
    
            it('should call the service to create a new exam subtype', async () => {
                // Arrange
                service.create.mockResolvedValue(mockExamSubtypeData);
    
                // Act
                const result = await controller.create(source, key, mockDto);
    
                // Assert
                expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
                expect(result).toEqual(mockResponse);
            });
        });
    
        describe('findOneAndUpdate', () => {
            const source = 'source';
            const key = 'key';
            const mockDto: PatchExamSubtypeExternalRequestDto = {
              name: 'Updated Exam Subtype'
            };
            const mockExamSubtypeData = mockExamsSubtype();
            const mockResponse: PatchExamSubtypeResponseDto = mockExamSubtypeData;
        
            it('should call the service to update an exam subtype', async () => {
              // Arrange
              service.findOneAndUpdate.mockResolvedValue(mockExamSubtypeData);
        
              // Act
              const result = await controller.findOneAndUpdate(source, key, mockDto);
        
              // Assert
              expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
              expect(result).toEqual(mockResponse);
            });
          }); */
});