import { Inject } from "@nestjs/common";

export const AuthProviderToken = 'AuthProvider';
export const InjectAuth = () => Inject(AuthProviderToken);

export const ApiKeyProviderToken = 'ApiKeyProvider';
export const InjectApiKey = () => Inject(ApiKeyProviderToken);

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

export const IncrementProviderToken = 'IncrementProvider';
export const InjectIncrement = () => Inject(IncrementProviderToken);

export const JwtAccessProviderToken = 'JwtAccessProvider';
export const JwtRefreshProviderToken = 'JwtRefreshProvider';
const jwtInjectToken = {
    'Access': JwtAccessProviderToken,
    'Refresh': JwtRefreshProviderToken,
}
export const InjectJwt = (token: keyof typeof jwtInjectToken) => Inject(jwtInjectToken[token]);