import { TestBed } from "@automock/jest";
import { FileTypePipe } from "./file-type.pipe";
import { MIME_TYPES } from "./constants";

describe('FileTypePipe', () => {
    let pipe: FileTypePipe;

    beforeEach(async () => {
        pipe = new FileTypePipe({ acceptableTypes: MIME_TYPES.PNG });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('isValid', () => {
        const file = {
            mimetype: MIME_TYPES.PNG,
            originalname: 'test.jpg'
        } as Express.Multer.File;

        it('should return true if the file MIME type is acceptable', async () => {
            // Arrange
            // Act
            const result = await pipe.isValid(file);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false if the file MIME type is not acceptable', async () => {
            // Arrange
            // Act
            const result = await pipe.isValid({ ...file, mimetype: 'application/not-valid' });

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('buildErrorMessage', () => {
        const file = { originalname: 'test.jpg', mimetype: MIME_TYPES.PNG };
        it('should return a formatted error message', () => {
            const errorMessage = pipe.buildErrorMessage(file);
            expect(errorMessage).toBe(`Actual file 'test.jpg' has unacceptable MIME type. List of acceptable types: image/png.`);
        });
    });


});