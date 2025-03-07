import { JobPosition } from "../job-position.domain";

describe('JobPosition Entity', () => {
    let jobPosition: JobPosition;

    beforeEach(() => {
        jobPosition = JobPosition.create({ name: 'Software Engineer' });
    });

    it('should get the correct initial state', () => {
        expect(jobPosition.name).toEqual('Software Engineer');
    });

    it('should rename the job position', () => {
        jobPosition.rename('Senior Software Engineer');
        expect(jobPosition.name).toEqual('Senior Software Engineer');
    });

    it('should rehydrate', () => {
        const jobPositionId = crypto.randomUUID();
        const rehydrated = JobPosition.rehydrate({
            id: jobPositionId,
            name: 'Software Engineer',
        });

        expect(rehydrated.id).toEqual(jobPositionId);
        expect(rehydrated.name).toEqual('Software Engineer');
    });
});
