import { TestBed } from "@automock/jest";
import { DoctorOptionService } from "../services/doctor-option.service";
import { DoctorOptionController } from "./doctor-option.controller";

describe('DoctorOptionController', () => {
  let controller: DoctorOptionController;
  let service: jest.Mocked<DoctorOptionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DoctorOptionController).compile();

    controller = unit;
    service = unitRef.get(DoctorOptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});