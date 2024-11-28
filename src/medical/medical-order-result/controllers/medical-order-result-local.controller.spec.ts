import { TestBed } from "@automock/jest";
import { MedicalOrderResultLocalController } from "./medical-order-result-local.controller";
import { MedicalOrderResultLocalService } from "../services/medical-order-result-local.service";

describe('MedicalOrderResultLocalController', () => {
  let controller: MedicalOrderResultLocalController;
  let service: jest.Mocked<MedicalOrderResultLocalService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderResultLocalController).compile();
    controller = unit;
    service = unitRef.get(MedicalOrderResultLocalService);
  });
});
