import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CatsMiddleware } from './cats/cats.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [CatsModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env']
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB'),
      connectionFactory(connection, name) {
        console.log(connection.name)
      },
    }),
    inject: [ConfigService],
  }),
],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatsMiddleware)
      .forRoutes('cats')
  }
}
