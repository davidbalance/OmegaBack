import { TestBed } from "@automock/jest";
import { DoctorFlatService } from "../doctor-flat.service";
import { mockDoctor } from "./stub/doctor.stub";
import { DoctorResponseDto } from "../../dtos/response/base.doctor.response.dto";

describe('DoctorFlatService', () => {
    let service: DoctorFlatService;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorFlatService).compile();

        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('flat', () => {
        const mockedDoctor = mockDoctor();
        const expectedResponse: DoctorResponseDto = {
            ...mockedDoctor.user,
            ...mockedDoctor,
            user: mockedDoctor.user.id
        };

        it('should return a DoctorResponseDto with user ID and doctor properties', () => {
            // Act
            const result = service.flat(mockedDoctor);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

});
