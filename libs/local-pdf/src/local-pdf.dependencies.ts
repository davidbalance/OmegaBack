import { PathType } from "@shared/shared/common";
import PdfPrinter from "pdfmake";

export const PdfToken = "LOCAL_PDF";
export const pdfFactory = (argPath: PathType): PdfPrinter => {
    const root = argPath.resolve('static/fonts/roboto');
    const fonts = {
        Roboto: {
            normal: argPath.join(root, 'roboto-regular-webfont.ttf'),
            bold: argPath.join(root, 'roboto-bold-webfont.ttf'),
            italics: argPath.join(root, 'roboto-italic-webfont.ttf'),
            bolditalics: argPath.join(root, 'roboto-bolditalic-webfont.ttf')
        }
    }
    return new PdfPrinter(fonts);
}