import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from './session.controller';
import { SessionService } from '../services/session.service';
import { TestBed } from '@automock/jest';

describe('SessionController', () => {
  let controller: SessionController;

  beforeEach(async () => {
    const { unit } = TestBed.create(SessionController).compile();
    controller = unit;
  });
  /* 
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [SessionController],
        providers: [SessionService],
      }).compile();
  
      controller = module.get<SessionController>(SessionController);
    });
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
