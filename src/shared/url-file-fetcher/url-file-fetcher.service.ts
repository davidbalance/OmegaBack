import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { fileExtension } from '../utils/file-extension';
import { NEST_UUID } from '../nest-ext/nest-uuid/inject-token';
import { NestUuid } from '../nest-ext/nest-uuid/nest-uuid.type';

@Injectable()
export class UrlFileFetcherService {

    constructor(
        @Inject(NEST_UUID) private readonly uuid: NestUuid,
    ) { }

    public async fetch(url: string): Promise<{ filename: string, mimetype: string, buffer: Buffer }> {
        try {
            const response: AxiosResponse = await axios.get(url, { responseType: 'arraybuffer' });
            const mimetype = response.headers['Content-Type'].toString();
            const extension = fileExtension(mimetype);
            const filename = `${this.uuid.v4()}${extension}`;

            return {
                filename,
                mimetype,
                buffer: Buffer.from(response.data)
            };
        } catch (error) {
            throw error;
        }
    }
}
