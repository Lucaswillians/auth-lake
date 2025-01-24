import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/db/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Procura as entidades
      synchronize: true, // Cria as tabelas automaticamente
    }),
  ],
})
export class AppModule { }
