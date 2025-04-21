import { ConfigService } from "@nestjs/config";
import { loadCompiler } from "../load-compiler";
import { HtmlLoaderConfigName } from "../config/html-loader.config";

describe('loadCompiler', () => {
    const templateString = '<html><body>{{ name }}</body></html>';
    const templatePath = '/resolved/template/path.html';
    const compiledMockFn = jest.fn();

    let mockConfig: jest.Mocked<ConfigService>;
    let mockFile;
    let mockPath;
    let mockLoader;

    beforeEach(() => {
        mockConfig = { getOrThrow: jest.fn() } as unknown as jest.Mocked<ConfigService>;

        mockFile = { readFileSync: jest.fn() };

        mockPath = { resolve: jest.fn() };

        mockLoader = { compile: jest.fn() };
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    it('should load and compile the template correctly', () => {
        mockConfig.getOrThrow.mockReturnValueOnce({
            template_path: templatePath
        });
        mockPath.resolve.mockReturnValueOnce(templatePath);
        mockFile.readFileSync.mockReturnValueOnce(templateString);
        mockLoader.compile.mockReturnValueOnce(compiledMockFn);

        const result = loadCompiler(mockConfig, mockFile, mockPath, mockLoader);

        expect(mockConfig.getOrThrow).toHaveBeenCalledWith(HtmlLoaderConfigName);
        expect(mockPath.resolve).toHaveBeenCalledWith(templatePath);
        expect(mockFile.readFileSync).toHaveBeenCalledWith(templatePath, 'utf-8');
        expect(mockLoader.compile).toHaveBeenCalledWith(templateString);
        expect(result).toBe(compiledMockFn);
    });
});