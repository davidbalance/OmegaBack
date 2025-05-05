import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export function setupGlobalPipesAndInterceptors<T>(app: INestApplication<T>) {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        // forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },

    }));
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            strategy: 'excludeAll',
            excludeExtraneousValues: true
        })
    );
}