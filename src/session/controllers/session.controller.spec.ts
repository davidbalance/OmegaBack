import { TestBed } from "@automock/jest";
import { SessionService } from "../services/session.service";
import { SessionController } from "./session.controller";
import { PostSessionRequestDto } from "../dto/request/session.post.dto";
import { PatchSessionRequestDto } from "../dto/request/session.patch.dto";

describe('SessionController', () => {
  let controller: SessionController;
  let service: jest.Mocked<SessionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(SessionController).compile();

    controller = unit;
    service = unitRef.get(SessionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a session', async () => {
      // Arrange
      const mockDto: PostSessionRequestDto = {
        token: "Stub token",
        refresh: "Stub refresh"
      };
      const mockedSessionId = 'mocked-session-id';
      service.create.mockResolvedValue(mockedSessionId);

      // Act
      const result = await controller.create(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual({ session: mockedSessionId });
    });
  });

  describe('findOne', () => {
    it('should find a session', async () => {
      // Arrange
      const sessionId = 'test-session-id';
      const mockedSession = { token: 'test-token', refresh: 'test-refresh' };
      service.findOne.mockResolvedValue(mockedSession);

      // Act
      const result = await controller.findOne(sessionId);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(sessionId);
      expect(result).toEqual(mockedSession);
    });
  });

  describe('updateOne', () => {
    it('should update a session', async () => {
      // Arrange
      const sessionId = 'test-session-id';
      const mockDto: PatchSessionRequestDto = { token: 'new-token', refresh: 'new-refresh' };
      service.updateOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateOne(sessionId, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(sessionId, mockDto);
      expect(result).toEqual({});
    });
  });

  describe('deleteOne', () => {
    it('should delete a session', async () => {
      // Arrange
      const sessionId = 'test-session-id';
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteOne(sessionId);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(sessionId);
      expect(result).toEqual({});
    });
  });

});