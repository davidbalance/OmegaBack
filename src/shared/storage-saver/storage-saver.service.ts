export abstract class StorageSaver {
    /**
     * Save file in a tmp directory in the localmachine
     * @param file 
     */
    abstract saveFile(file: Express.Multer.File): string | Promise<string>
    /**
     * Saves file in the given directory in the localmachine
     * @param file 
     * @param dir 
     */
    abstract saveFile(file: Express.Multer.File, dir: string): string | Promise<string>
}