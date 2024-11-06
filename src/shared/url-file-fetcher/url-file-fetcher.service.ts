import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { fileExtension } from '../utils/file-extension';
import { NEST_UUID } from '../nest-ext/uuid/inject-token';
import { Uuid } from '../nest-ext/uuid/uuid.type';

@Injectable()
export class UrlFileFetcherService {

    constructor(
        @Inject(NEST_UUID) private readonly uuid: Uuid,
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
