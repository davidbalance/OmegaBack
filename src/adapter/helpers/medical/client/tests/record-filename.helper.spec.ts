import { formatDate } from "date-fns";
import { reportFilenameHelper } from "../record-filename.helper";

describe('reportFilenameHelper', () => {
    const fixedDate = new Date('2025-04-21T10:30:45');
    const formatted = formatDate(fixedDate, 'yyyy_MM_dd_HH_mm_ss');

    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(fixedDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should generate lowercase filename with timestamp', () => {
        const result = reportFilenameHelper('MyCustomTitle');
        expect(result).toBe(`mycustomtitle_${formatted}.pdf`);
    });

    it('should handle empty string input', () => {
        const result = reportFilenameHelper('');
        expect(result).toBe(`_${formatted}.pdf`);
    });

    it('should not crash with special characters', () => {
        const result = reportFilenameHelper('Çlîënt Rêpørt!');
        expect(result).toBe(`çlîënt rêpørt!_${formatted}.pdf`);
    });
});