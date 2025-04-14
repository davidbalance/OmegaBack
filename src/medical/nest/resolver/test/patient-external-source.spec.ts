import { Test, TestingModule } from '@nestjs/testing';
import { ClientModelRepositoryToken } from '../../inject/model-repository.inject';
import { ClientCreateCommandToken } from '../../inject/command.inject';
import { PatientExternalSourceNestResolver } from '../patient-external-source.nest-resolver';
import { ClientRepository } from '@omega/medical/application/repository/model.repositories';
import { ClientCreateCommand } from '@omega/medical/application/commands/client/client-create.command';
import { ClientModel } from '@omega/medical/core/model/client/client.model';
import { PatientExternalSourceResolverPayload } from '@omega/medical/application/resolver/patient-external-source.resolver';
import { ClientNotFoundError } from '@omega/medical/core/domain/client/errors/client.errors';

describe('PatientExternalSourceNestResolver', () => {
    let resolver: PatientExternalSourceNestResolver;
    let externalConnection: jest.Mocked<ClientRepository>;
    let createCommand: jest.Mocked<ClientCreateCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientCreateCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PatientExternalSourceNestResolver,
                { provide: ClientModelRepositoryToken, useValue: externalConnection },
                { provide: ClientCreateCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<PatientExternalSourceNestResolver>(PatientExternalSourceNestResolver);
    });

    it('should return an existing patient if found', async () => {
        const mockSubpatient: ClientModel = {
            patientId: 'patient-id',
            patientExternalKey: 'external-value',
            patientExternalOwner: 'external-owner'
        } as unknown as ClientModel;

        externalConnection.findOneAsync.mockResolvedValue(mockSubpatient);

        const payload: PatientExternalSourceResolverPayload = {
            patientName: 'patient name',
            patientBirthday: new Date(),
            patientDni: '1234567890',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname'
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'patientDni', operator: 'eq', value: payload.patientDni },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockSubpatient);
    });

    it('should create an patient if not found', async () => {
        const mockSubpatient: ClientModel = {
            patientId: 'patient-id',
            patientExternalKey: 'external-value',
            patientExternalOwner: 'external-owner'
        } as unknown as ClientModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockSubpatient);

        const payload: PatientExternalSourceResolverPayload = {
            patientName: 'patient name',
            patientBirthday: new Date(),
            patientDni: '1234567890',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname'
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'patientDni', operator: 'eq', value: payload.patientDni },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            patientDni: payload.patientDni,
            patientName: payload.patientName,
            patientLastname: payload.patientLastname,
            patientGender: payload.patientGender,
            patientBirthday: payload.patientBirthday,
            patientEmail: payload.patientEmail,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw ClientNotFoundError if patient is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: PatientExternalSourceResolverPayload = {
            patientName: 'patient name',
            patientBirthday: new Date(),
            patientDni: '1234567890',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname'
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(ClientNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'patientDni', operator: 'eq', value: payload.patientDni },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            patientDni: payload.patientDni,
            patientName: payload.patientName,
            patientLastname: payload.patientLastname,
            patientGender: payload.patientGender,
            patientBirthday: payload.patientBirthday,
            patientEmail: payload.patientEmail,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
