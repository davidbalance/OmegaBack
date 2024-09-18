import { Injectable } from '@nestjs/common';

@Injectable()
export class Base64Service {
    public toBuffer(base64: string): Buffer {
        const base64Data = base64
            .replace(/^data:application\/\w+;base64,/, '')
            .replace(/^data:image\/\w+;base64,/, '')
            .replace(/^data:audio\/\w+;base64,/, '')
            .replace(/^data:video\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        return buffer;
    }
}
