export abstract class StorageSaver {
    abstract saveFile(file: Express.Multer.File): string | Promise<string>
}