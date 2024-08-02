export abstract class LoggerWritter {
    abstract write(info: any): void | Promise<void>;
}