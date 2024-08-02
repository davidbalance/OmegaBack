import { TestBed } from "@automock/jest";
import { WebClientRepository } from "../../repositories/web-client.repository";
import { WebClientService } from "../web-client.service";
import { mockWebClient } from "./stub/web-client.stub";

describe('WebClientService', () => {
    let service: WebClientService;
    let repository: jest.Mocked<WebClientRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(WebClientService).compile();

        service = unit;
        repository = unitRef.get(WebClientRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findOne', () => {
        const userId = 1;
        const mockedClient = mockWebClient();

        it('should return a web client with logo and resources', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedClient);

            // Act
            const client = await service.findOne(userId);

            // Assert
            expect(client).toEqual(mockedClient);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { user: userId },
                select: {
                    logo: { name: true },
                    resources: { icon: true, label: true, address: true },
                },
            });
        });
    });

});