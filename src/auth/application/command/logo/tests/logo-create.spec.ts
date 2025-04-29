/* eslint-disable @typescript-eslint/unbound-method */
import { LogoConflictError } from "@omega/auth/core/domain/logo/errors/logo.errors";
import { CreateLogoPayload } from "@omega/auth/core/domain/logo/payloads/logo.payload";
import { LogoCreateCommand, LogoCreateCommandImpl } from "../logo-create.command";
import { Logo } from "@omega/auth/core/domain/logo/logo.domain";
import { LogoRepository } from "@omega/auth/application/repository/logo/aggregate.repositories";

describe("LogoCreateCommand", () => {
    let repository: jest.Mocked<LogoRepository>;
    let command: LogoCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<LogoRepository>;

        command = new LogoCreateCommandImpl(repository);
    });

    it("should create logo successfully when logo name does not exist", async () => {
        const logoName = "New Logo";
        const payload: CreateLogoPayload = { name: logoName };

        repository.findOneAsync.mockResolvedValue(null); // Simulating that the logo does not exist.

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "name", operator: "eq", value: logoName }],
        });
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw LogoConflictError when logo name already exists", async () => {
        const logoName = "Existing Logo";
        const payload: CreateLogoPayload = { name: logoName };
        const mockLogo: Logo = { name: logoName } as unknown as Logo;

        repository.findOneAsync.mockResolvedValue(mockLogo); // Simulating that the logo already exists.

        await expect(command.handleAsync(payload)).rejects.toThrow(LogoConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "name", operator: "eq", value: logoName }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
