import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { v4 } from 'uuid';
import { fileExtension } from '../utils/file-extension';

@Injectable()
export class UrlFileFetcherService {

    public async fetch(url: string): Promise<{ filename: string, mimetype: string, buffer: Buffer }> {
        try {
            const response: AxiosResponse = await axios.get(url, { responseType: 'arraybuffer' });
            const mimetype = response.headers['Content-Type'].toString();
            const extension = fileExtension(mimetype);
            const filename = `${v4()}${extension}`;

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
