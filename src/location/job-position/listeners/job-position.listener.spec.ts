import { TestBed } from "@automock/jest";
import { JobPositionManagementService } from "../services/job-position-management.service";
import { JobPositionListener } from "./job-position.listener";

describe('JobPositionListener', () => {
    let listener: JobPositionListener;
    let service: jest.Mocked<JobPositionManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionListener).compile();

        listener = unit;
        service = unitRef.get(JobPositionManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});