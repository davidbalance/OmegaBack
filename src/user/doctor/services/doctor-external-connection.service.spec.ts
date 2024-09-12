import { TestBed } from "@automock/jest";
import { PatchDoctorRequestDto } from "../dtos/request/doctor.patch.dto";
import { PostDoctorRequestDto } from "../dtos/request/doctor.post.dto";
import { DoctorExternalConnectionService } from "./doctor-external-connection.service";
import { DoctorManagementService } from "./doctor-management.service";
import { mockDoctor } from "../stub/doctor.stub";

describe('DoctorExternalConnectionService', () => {
    let service: DoctorExternalConnectionService;
    let managementService: jest.Mocked<DoctorManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorExternalConnectionService).compile();

        service = unit;
        managementService = unitRef.get(DoctorManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const data: PostDoctorRequestDto = {
            dni: '1234567890',
            name: 'Test User',
            lastname: 'Test Lastname',
            email: "test@email.com"
        };
        const mockedDoctor = mockDoctor();
        const expectedValue = mockedDoctor;

        it('should create a new doctor', async () => {
            // Arrange
            managementService.create.mockResolvedValue(mockedDoctor);

            // Act
            const result = await service.create(data);

            // Assert
            expect(managementService.create).toHaveBeenCalledWith(data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOne', () => {
        const dni = '1234567890';
        const mockedDoctor = mockDoctor();
        const expectedValue = mockedDoctor;

        it('should find a doctor by dni', async () => {
            // Arrange
            managementService.findOneByDni.mockResolvedValue(mockedDoctor);

            // Act
            const result = await service.findOne(dni);

            // Assert
            expect(managementService.findOneByDni).toHaveBeenCalledWith(dni);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneOrCreate', () => {
        const data: PostDoctorRequestDto = {
            dni: '1234567890',
            name: 'Test User',
            lastname: 'Test Lastname',
            email: "test@email.com"
        };
        const mockedDoctor = mockDoctor();
        const expectedValue = mockedDoctor;

        it('should find or create a new doctor', async () => {
            // Arrange
            managementService.findOneByDni.mockResolvedValue(mockedDoctor);

            // Act
            const result = await service.findOneOrCreate(data);

            // Assert
            expect(managementService.findOneByDni).toHaveBeenCalledWith(data.dni);
            expect(result).toEqual(expectedValue);
        });

        it('should create a new doctor if not found', async () => {
            // Arrange
            managementService.findOneByDni.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedDoctor);

            // Act
            const result = await service.findOneOrCreate(data);

            // Assert
            expect(managementService.findOneByDni).toHaveBeenCalledWith(data.dni);
            expect(service.create).toHaveBeenCalledWith(data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const dni = '1234567890';
        const data: PatchDoctorRequestDto = {
            name: 'Updated User'
        };
        const mockedDoctor = mockDoctor();
        const expectedValue = mockedDoctor;

        it('should update a doctor', async () => {
            // Arrange
            managementService.updateOneByDni.mockResolvedValue(mockedDoctor);

            // Act
            const result = await service.findOneAndUpdate(dni, data);

            // Assert
            expect(managementService.updateOneByDni).toHaveBeenCalledWith(dni, data);
            expect(result).toEqual(expectedValue);
        });
    });
});
