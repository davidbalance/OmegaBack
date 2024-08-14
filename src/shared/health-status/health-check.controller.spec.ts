import { HealthCheckController } from './health-check.controller';
import { TestBed } from '@automock/jest';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const { unit } = TestBed.create(HealthCheckController).compile();

    controller = unit;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return status okay', () => {
    // Arrange
    // Act
    const result = controller.healthCheck();

    // Assert
    expect(result).toEqual({ health: 'ok' });
  });
});
