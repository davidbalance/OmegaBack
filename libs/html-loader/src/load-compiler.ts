import { HtmlLoaderProvider } from '@shared/shared/providers/html-loader.provider';
import { ConfigService } from '@nestjs/config';
import { HtmlLoaderConfig, HtmlLoaderConfigName } from './config/html-loader.config';
import { FileType, PathType } from '@shared/shared/common';
import { HtmlLoaderType } from './html-loader.dependencies';

export const loadCompiler = <T extends object>(
    config: ConfigService,
    fileArg: FileType,
    pathArg: PathType,
    loader: HtmlLoaderType,
): HtmlLoaderProvider<T> => {
    const options = config.getOrThrow<HtmlLoaderConfig>(HtmlLoaderConfigName);
    const templatePath = pathArg.resolve(options.template_path);
    const template = fileArg.readFileSync(templatePath, 'utf-8');
    const compile = loader.compile(template);
    return compile;
}