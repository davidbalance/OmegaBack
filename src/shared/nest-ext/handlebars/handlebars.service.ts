import { Inject, Injectable } from '@nestjs/common';
import { TemplateDelegate } from 'handlebars';
import { NEST_FS } from '../fs/inject-token';
import { FS } from '../fs/fs.type';
import { Handlebars as hb } from './handlebars.type';
import { NEST_PATH } from '../path/inject-token';
import { Path } from '../path/path.type';
import { HandlebarsModuleOptions } from './handlebars.module-options';
import { MODULE_OPTIONS_TOKEN } from './handlebars.module-definition';

@Injectable()
export class HandlebarsService {

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly options: HandlebarsModuleOptions,
        @Inject('HANDLEBAR_BASE') private readonly handlebars: hb,
        @Inject(NEST_PATH) private readonly path: Path,
        @Inject(NEST_FS) private readonly fs: FS,
    ) { }

    public loadTemplate(): TemplateDelegate {
        const templateFolder: string = this.path.resolve(this.options.template);
        const template: string = this.path.join(templateFolder, this.options.name);
        const source: string = this.fs.readFileSync(template, 'utf-8');
        const compile = this.handlebars.compile(source);
        return compile;
    }
}
