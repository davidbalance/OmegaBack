import { TestBed } from "@automock/jest";
import { PatientEeqFlatService } from "../patient-eeq-flat.service";
import { mockPatient } from "./stub/patient.stub";
import { PatientEeqResponseDto } from "../../dtos/response/base.patient-eeq.response.dto";

describe('PatientEeqFlatService', () => {
    let service: PatientEeqFlatService;

    beforeEach(async () => {
        const { unit } = TestBed.create(PatientEeqFlatService).compile();

        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('flat', () => {

        const mockedPatient = mockPatient();
        const extraAttributesWithRole: any[] = [{ name: 'role', value: 'admin' }];
        const extraAttributesWithoutRole: any[] = [{ name: 'otherAttribute', value: 'admin' }];
        const expectedResponse: PatientEeqResponseDto = {
            dni: mockedPatient.user.dni,
            name: mockedPatient.user.name,
            lastname: mockedPatient.user.lastname,
            ...mockedPatient,
            role: extraAttributesWithoutRole[0].value,
            user: mockedPatient.user.id
        };

        it('should return a PatientEeqResponseDto with role if role exists in extraAttributes', () => {
            // Act
            const result = service.flat({ ...mockedPatient, user: { ...mockedPatient.user, extraAttributes: extraAttributesWithRole } });

            // Assert
            expect(result).toEqual(expectedResponse);
        });

        it('should return null if role does not exist in extraAttributes', () => {
            // Act
            const result = service.flat({ ...mockedPatient, user: { ...mockedPatient.user, extraAttributes: extraAttributesWithoutRole } });

            // Assert
            expect(result).toBeNull();
        });

        it('should return null if extraAttributes is empty', () => {
            // Act
            const result = service.flat({ ...mockedPatient, user: { ...mockedPatient.user, extraAttributes: [] } });

            // Assert
            expect(result).toBeNull();
        });

        it('should return null if user object does not have extraAttributes', () => {
            // Act
            const result = service.flat(mockedPatient);

            // Assert
            expect(result).toBeNull();
        });
    });

});