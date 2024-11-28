import { TestBed } from "@automock/jest";
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorOptionService } from "./doctor-option.service";

describe('DoctorOptionService', () => {
  let service: DoctorOptionService;
  let repository: jest.Mocked<DoctorRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorOptionService).compile();

    service = unit;
    repository = unitRef.get(DoctorRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
