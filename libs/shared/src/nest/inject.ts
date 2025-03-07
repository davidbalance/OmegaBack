import { Inject } from "@nestjs/common";

export const AuthProviderToken = 'AuthProvider';
export const InjectAuth = () => Inject(AuthProviderToken);

export const EmailProviderToken = 'EmailProvider';
export const InjectEmail = () => Inject(EmailProviderToken);

export const FileProviderToken = 'FileProvider';
export const InjectFile = () => Inject(FileProviderToken);

export const PdfProviderToken = 'PdfProvider';
export const InjectPdf = () => Inject(PdfProviderToken);

export const SpreadSheetProviderToken = 'SpreadSheetProvider';
export const InjectSpreadSheet = () => Inject(SpreadSheetProviderToken);

export const HtmlLoaderProviderToken = 'HtmlLoaderProvider';
export const InjectHtmlLoader = () => Inject(HtmlLoaderProviderToken);

export const PasswordProviderToken = 'PasswordProvider';
export const InjectPassword = () => Inject(PasswordProviderToken);

export const LoggerProviderToken = 'LoggerProvider';
export const InjectLogger = () => Inject(LoggerProviderToken);

export const ZipperProviderToken = 'ZipperProvider';
export const InjectZipper = () => Inject(ZipperProviderToken);


export const JwtAccessProviderToken = 'JwtAccessProvider';
export const JwtRefreshProviderToken = 'JwtRefreshProvider';
const jwtInjectToken = {
    'Access': 'JwtAccessProvider',
    'Refresh': 'JwtRefreshProvider',
}
export const InjectJwt = (token: keyof typeof jwtInjectToken) => Inject(jwtInjectToken[token]);