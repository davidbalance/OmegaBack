/* eslint-disable @typescript-eslint/unbound-method */
import { LogoRepository } from "@omega/auth/application/repository/logo/model.repositories";
import { LogoFindManyQuery } from "../logo-find-many.query";
import { LogoModel } from "@omega/auth/core/model/logo/logo.model";

describe("LogoFindManyQuery", () => {
    let logoRepository: jest.Mocked<LogoRepository>;
    let query: LogoFindManyQuery;

    beforeEach(() => {
        logoRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<LogoRepository>;

        query = new LogoFindManyQuery(logoRepository);
    });

    it("should return all logos when no filter is provided", async () => {
        const mockLogos: LogoModel[] = [
            { id: "logo1", name: "Logo 1" },
            { id: "logo2", name: "Logo 2" },
        ] as unknown as LogoModel[];

        logoRepository.findManyAsync.mockResolvedValue(mockLogos);

        const result = await query.handleAsync();

        expect(logoRepository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual(mockLogos);
    });
});
