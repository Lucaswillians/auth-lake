import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../src/User/user.entity';
import { UserService } from '../../src/User/user.service';

describe('UserService - SQLite Test', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:', 
          entities: [UserEntity], 
          synchronize: true, 
          dropSchema: true, 
        }),
        TypeOrmModule.forFeature([UserEntity]), 
      ],
      providers: [UserService], 
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should insert and retrieve an user', async () => {
    const userMock = {
      name: 'Test',
      email: 'test@gmail.com',
      password: 'test'
    };

    const userSaved = await service.createUser(userMock); 
    const foundUser = await service.getOne(userSaved.id);

    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe(userMock.name);
  });
});
