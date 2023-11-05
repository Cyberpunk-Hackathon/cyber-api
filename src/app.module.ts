import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env.local',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { uri: configService.get('MONGO_URI') };
      },
    }),
    ControllersModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
