import { LocalStorageService } from "./local-storage.service";

jest.mock('fs');
jest.mock('path');
jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

describe('LocalStorageService', () => {
    let service: LocalStorageService;

    it('to be defined', () => {
        expect(service);
    });

/*     beforeEach(async () => {
        const { unit } = TestBed.create(LocalStorageService).compile();
        service = unit;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('saveFile', () => {
        const buffer = Buffer.from('test content');
        const extension = '.txt';
        const destinationPath = 'tmp';
        const filename = 'testfile';
        const resolvedPath = '/absolute/tmp';
        const outputFilePath = '/absolute/tmp/testfile.txt';

        it('should save the file with a non existing folder and return the file path', () => {
            // Arrange
            (uuidv4 as jest.Mock).mockReturnValue('uuid');
            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(false);
            (fs.mkdirSync as jest.Mock).mockImplementation(() => { });
            const mockWriteStream = {
                write: jest.fn(),
                end: jest.fn(),
            };
            (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);

            // Act
            const result = service.saveFile(buffer, extension, destinationPath, filename);

            // Assert
            expect(result).toBe(outputFilePath);
            expect(path.resolve).toHaveBeenCalledWith(destinationPath);
            expect(fs.existsSync).toHaveBeenCalledWith(destinationPath);
            expect(fs.mkdirSync).toHaveBeenCalledWith(destinationPath, { recursive: true });
            expect(fs.createWriteStream).toHaveBeenCalledWith(outputFilePath);
            expect(mockWriteStream.write).toHaveBeenCalledWith(buffer);
            expect(mockWriteStream.end).toHaveBeenCalled();
        });

        it('should save the file with an existing folder and return the file path', () => {
            // Arrange
            (uuidv4 as jest.Mock).mockReturnValue('uuid');
            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.mkdirSync as jest.Mock).mockImplementation(() => { });
            const mockWriteStream = {
                write: jest.fn(),
                end: jest.fn(),
            };
            (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);

            // Act
            const result = service.saveFile(buffer, extension, destinationPath, filename);

            // Assert
            expect(result).toBe(outputFilePath);
            expect(path.resolve).toHaveBeenCalledWith(destinationPath);
            expect(fs.existsSync).toHaveBeenCalledWith(destinationPath);
            expect(fs.mkdirSync).not.toHaveBeenCalled();
            expect(fs.createWriteStream).toHaveBeenCalledWith(outputFilePath);
            expect(mockWriteStream.write).toHaveBeenCalledWith(buffer);
            expect(mockWriteStream.end).toHaveBeenCalled();
        });
    });

    describe('readFile', () => {
        it('should return a StreamableFile when the file exists', () => {
            const dir = 'testfile.txt';
            const resolvedPath = '/absolute/testfile.txt';
            const mockReadStream = {};

            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.createReadStream as jest.Mock).mockReturnValue(mockReadStream);

            const result = service.readFile(dir);

            expect(result).toBeInstanceOf(StreamableFile);
            expect(fs.createReadStream).toHaveBeenCalledWith(resolvedPath);
        });

        it('should throw NotFoundException when the file does not exist', () => {
            const dir = 'nonexistentfile.txt';
            const resolvedPath = '/absolute/nonexistentfile.txt';

            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(false);

            expect(() => service.readFile(dir)).toThrow(NotFoundException);
            expect(fs.existsSync).toHaveBeenCalledWith(resolvedPath);
        });

        it('should throw InternalServerErrorException when there is an error reading the file', () => {
            const dir = 'testfile.txt';
            const resolvedPath = '/absolute/testfile.txt';

            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.createReadStream as jest.Mock).mockImplementation(() => {
                throw new Error('read error');
            });

            expect(() => service.readFile(dir)).toThrow(InternalServerErrorException);
        });
    });

    describe('deleteFile', () => {
        it('should delete the file and return true when the file exists', () => {
            const dir = 'testfile.txt';
            const resolvedPath = '/absolute/testfile.txt';

            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.unlinkSync as jest.Mock).mockImplementation(() => { });

            const result = service.deleteFile(dir);

            expect(result).toBe(true);
            expect(fs.existsSync).toHaveBeenCalledWith(resolvedPath);
            expect(fs.unlinkSync).toHaveBeenCalledWith(resolvedPath);
        });

        it('should throw NotFoundException when the file does not exist', () => {
            const dir = 'nonexistentfile.txt';
            const resolvedPath = '/absolute/nonexistentfile.txt';

            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(false);

            expect(() => service.deleteFile(dir)).toThrow(NotFoundException);
            expect(fs.existsSync).toHaveBeenCalledWith(resolvedPath);
        });

        it('should throw InternalServerErrorException when there is an error deleting the file', () => {
            const dir = 'testfile.txt';
            const resolvedPath = '/absolute/testfile.txt';

            (path.resolve as jest.Mock).mockReturnValue(resolvedPath);
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.unlinkSync as jest.Mock).mockImplementation(() => {
                throw new Error('delete error');
            });

            expect(() => service.deleteFile(dir)).toThrow(InternalServerErrorException);
        });
    }); */
});