import { TestBed } from "@automock/jest";
import { SessionRepository } from "../respository/session.repository";
import { SessionService } from "./session.service";
import { PostSessionRequestDto } from "../dto/request/session.post.dto";
import { v4 } from "uuid";
import { mockSession, mockSessions } from "../stub/session.stub";
import { PatchSessionRequestDto } from "../dto/request/session.patch.dto";

jest.mock('uuid');

describe('SessionService', () => {
  let service: SessionService;
  let repository: jest.Mocked<SessionRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(SessionService).compile();

    service = unit;
    repository = unitRef.get(SessionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a session', async () => {
      // Arrange
      const mockDto: PostSessionRequestDto = {
        token: "test-token",
        refresh: "test-refresh"
      };
      const mockedSessionId = 'mocked-session-id';
      (v4 as jest.Mock).mockReturnValue(mockedSessionId);

      // Act
      const result = await service.create(mockDto);

      // Assert
      expect(repository.create).toHaveBeenCalledWith({ ...mockDto, session: mockedSessionId });
      expect(result).toEqual(mockedSessionId);
    });
  });

  describe('findOne', () => {
    it('should find a session', async () => {
      // Arrange
      const sessionId = 'test-session-id';
      const mockedSession = mockSession();
      repository.findOne.mockResolvedValue(mockedSession);

      // Act
      const result = await service.findOne(sessionId);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({ where: { session: sessionId }, select: { token: true, refresh: true } });
      expect(result).toEqual(mockedSession);
    });
  });

  describe('updateOne', () => {
    it('should update a session', async () => {
      // Arrange
      const sessionId = 'test-session-id';
      const mockDto: PatchSessionRequestDto = { token: 'new-token', refresh: 'new-refresh' };

      // Act
      await service.updateOne(sessionId, mockDto);

      // Assert
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ session: sessionId }, { ...mockDto });
    });
  });

  describe('deleteOne', () => {
    it('should delete a session', async () => {
      // Arrange
      const sessionId = 'test-session-id';

      // Act
      await service.deleteOne(sessionId);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ session: sessionId });
    });
  });

});
