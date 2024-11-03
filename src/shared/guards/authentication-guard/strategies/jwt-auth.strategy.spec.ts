import { ConfigService } from "@nestjs/config";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { ExtractJwt } from "passport-jwt";
import { Test, TestingModule } from "@nestjs/testing";

describe('AreaManagementService', () => {
    let strategy: JwtAuthStrategy;
    let configService: ConfigService;
    const mockedJwt: string = 'test-secret';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtAuthStrategy,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue({
                            jwt_secret: mockedJwt
                        }),
                    },
                },
            ],
        }).compile();

        strategy = module.get<JwtAuthStrategy>(JwtAuthStrategy);
        configService = module.get<ConfigService>(ConfigService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should extract JWT from the Authorization header', () => {
        // Arrange
        const req = {
            headers: {
                authorization: 'Bearer test-token',
            },
        };
        const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();

        // Act
        const token = jwtExtractor(req as any);

        // Assert
        expect(token).toBe('test-token');
    });

    describe('validate', () => {

        it('should validate API key and return user data', async () => {
            // Arrange
            const payload = { sub: 1, username: 'testuser' };

            // Act
            const userId = await strategy.validate(payload as any);

            // Assert
            expect(userId).toBe(1);
        });
    });
});