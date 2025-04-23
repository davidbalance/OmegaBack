/* eslint-disable no-control-regex */
import Transport, { TransportStreamOptions } from "winston-transport";
import { WriteLoggerCommand } from "../application/command/write-logger.command";

export class PersistenceTransport extends Transport {
    constructor(
        private readonly writter: WriteLoggerCommand,
        stream: TransportStreamOptions
    ) {
        super(stream);
    }

    public async log(info: { level: string, message: string, timestamp: Date }, next: () => void) {
        setImmediate(() => this.emit('logged', info));

        try {
            const level = info.level.replace(/\x1B\[[0-9;]*[A-Za-z]/g, '');
            const message = info.message.replace(/\x1B\[[0-9;]*[A-Za-z]/g, '').trimStart();
            const timestamp = info.timestamp;

            await this.writter.handleAsync({ level, message, timestamp });
        } catch (error) {
            console.error(error);
        } finally {
            next();
        }
    }
}