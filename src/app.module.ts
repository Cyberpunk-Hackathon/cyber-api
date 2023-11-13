import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './infrastructure/common/guards/auth.guard';
import { CloudIdGuard } from './infrastructure/common/guards/cloud-id.guard';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { uri: configService.get('MONGO_URI') };
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ControllersModule,
    JwtModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      scope: Scope.REQUEST,
      useFactory: (
        jwtService: JwtService,
        reflector: Reflector,
        configService: ConfigService,
      ) => {
        return new AuthGuard(jwtService, reflector, configService);
      },
      inject: [JwtService, Reflector, ConfigService],
    },
    {
      provide: APP_GUARD,
      scope: Scope.REQUEST,
      useClass: CloudIdGuard,
    },
  ],
})
export class AppModule {}
