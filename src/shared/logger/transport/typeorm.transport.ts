import { DataSource } from 'typeorm';
import Transport, { TransportStreamOptions } from 'winston-transport';
import { LoggerWritter } from '../interfaces/logger-writter.interface';

export class TypeOrmTransport extends Transport {

    constructor(private loggerWritter: LoggerWritter, stream: TransportStreamOptions) {
        super(stream);
    }

    log(info: any, next: () => void) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        try {
            this.loggerWritter.write(info)
        } catch (error) {
            console.error(error);
        } finally {
            next();
        }
    }
}