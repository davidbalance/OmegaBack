import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export function setupGlobalPipesAndInterceptors<T>(app: INestApplication<T>) {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        skipMissingProperties: true,  // Skip properties that are missing in the request
        transform: true,  // Transform payloads
    }));
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            strategy: 'excludeAll',
            excludeExtraneousValues: true
        })
    );
}