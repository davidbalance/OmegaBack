import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalSourceResolver } from "../../resolver/corporative-external-source.resolver";
import { CreateCorporativeFromExternalSourcePayload, CreateCorporativeFromExternalSourceService } from "../create-corporative-from-external-source.service";

describe('CreateCorporativeFromExternalSourceService', () => {
    let service: CreateCorporativeFromExternalSourceService;
    let corporativeResolver: jest.Mocked<CorporativeExternalSourceResolver>;

    beforeEach(async () => {
        corporativeResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<CorporativeExternalSourceResolver>;

        service = new CreateCorporativeFromExternalSourceService(corporativeResolver);
    });

    it('should resolve a corporative', async () => {
        const mockCorporative: CorporativeExternalConnectionModel = {
            corporativeId: 'corporative-id',
            corporativeExternalKey: 'external-value',
            corporativeExternalOwner: 'external-owner'
        } as unknown as CorporativeExternalConnectionModel;

        corporativeResolver.resolve.mockResolvedValue(mockCorporative);

        const payload: CreateCorporativeFromExternalSourcePayload = {
            owner: 'external-value',
            corporativeKey: "corporative-key",
            corporativeName: "coporative name",
        };

        const result = await service.createAsync(payload);

        expect(corporativeResolver.resolve).toHaveBeenCalledWith(payload);
        expect(result).toEqual(mockCorporative);
    });
});
