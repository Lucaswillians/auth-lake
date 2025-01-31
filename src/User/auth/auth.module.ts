import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { UserModule } from '../user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './auth.constants';
import { AuthGuard } from './auth.guard';
import { WinstonModule } from 'nest-winston';
import { appLogger } from 'src/logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret || '',
      signOptions: { expiresIn: '60s' },
    }),
    WinstonModule.forRoot(appLogger),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule { }
