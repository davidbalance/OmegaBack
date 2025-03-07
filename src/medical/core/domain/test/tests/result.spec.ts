import { Result } from "../result.domain";

describe('Result Entity', () => {
    let result: Result;

    beforeEach(() => {
        result = Result.create({ testId: 'Test1' });
    });

    it('should get the correct initial state', () => {
        expect(result.testId).toEqual('Test1');
        expect(result.filepath).toEqual('');
        expect(result.hasFile).toBeFalsy();
    });

    it('should add a file to the result', () => {
        result.addFile('/path/to/file');
        expect(result.filepath).toEqual('/path/to/file');
        expect(result.hasFile).toBeTruthy();
    });

    it('should remove the file from the result', () => {
        result.addFile('/path/to/file');
        result.removeFile();
        expect(result.filepath).toEqual('');
        expect(result.hasFile).toBeFalsy();
    });

    it('should rehydrate', () => {
        const resultId = crypto.randomUUID();
        const rehydrated = Result.rehydrate({
            id: resultId,
            testId: 'Test1',
            filepath: "",
            hasFile: false
        });

        expect(rehydrated.id).toEqual(resultId);
        expect(result.testId).toEqual('Test1');
        expect(result.filepath).toEqual('');
        expect(result.hasFile).toBeFalsy();
    });
});
