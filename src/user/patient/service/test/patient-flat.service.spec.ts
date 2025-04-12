import { TestBed } from "@automock/jest";
import { mockPatient } from "./stub/patient.stub";
import { PatientFlatService } from "../patient-flat.service";
import { PatientResponseDto } from "../../dtos/response/base.patient.response.dto";

describe('PatientFlatService', () => {
    let service: PatientFlatService;

    beforeEach(async () => {
        const { unit } = TestBed.create(PatientFlatService).compile();

        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('flat', () => {

        const mockedPatient = mockPatient();
        const expectedResponse: PatientResponseDto = {
            dni: mockedPatient.user.dni,
            name: mockedPatient.user.name,
            lastname: mockedPatient.user.lastname,
            ...mockedPatient,
            user: mockedPatient.user.id
        };

        it('should return a PatientResponseDto with role if role exists in extraAttributes', () => {
            // Act
            const result = service.flat(mockedPatient);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

});