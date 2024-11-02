import { Inject, Injectable } from '@nestjs/common';
import { TemplateDelegate } from 'handlebars';
import { NEST_FS } from '../nest-ext/nest-fs/inject-token';
import { NestFS } from '../nest-ext/nest-fs/nest-fs.type';
import { NEST_HANDLEBARS } from '../nest-ext/nest-handlebars/inject-token';
import { NestHandlebars } from '../nest-ext/nest-handlebars/nest-handlebars.type';
import { NEST_PATH } from '../nest-ext/nest-path/inject-token';
import { NestPath } from '../nest-ext/nest-path/nest-path.type';
import { HandlebarsModuleOptions } from './handlebars.module-options';
import { MODULE_OPTIONS_TOKEN } from './handlebars.module-definition';

@Injectable()
export class HandlebarsService {

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly options: HandlebarsModuleOptions,
        @Inject(NEST_HANDLEBARS) private readonly handlebars: NestHandlebars,
        @Inject(NEST_PATH) private readonly path: NestPath,
        @Inject(NEST_FS) private readonly fs: NestFS,
    ) { }

    public loadTemplate(): TemplateDelegate {
        const templateFolder: string = this.path.resolve(this.options.template);
        const template: string = this.path.join(templateFolder, this.options.name);
        const source: string = this.fs.readFileSync(template, 'utf-8');
        const compile = this.handlebars.compile(source);
        return compile;
    }
}
