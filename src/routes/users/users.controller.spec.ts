import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import e from 'express';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUserService: Partial<UsersService>;
  let faceAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne(id: number): null | Promise<User | null> {
        return Promise.resolve({id, email: 'email@gmai.com', password: 'pass'} as User);
      },
      find: (email: string) => Promise.resolve([{id: 1, email, password: 'pass'} as User]),
      create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as User),
      async remove(id: number): Promise<User> {
        return Promise.resolve({id: 1, email: 'email@gmai.com', password: 'pass'} as User);
      },
      async update(id: string): Promise<User> {
        return Promise.resolve({id: +id, email: 'email@gmai.com', password: 'pass'} as User);
      },
    };

    faceAuthService  = {
      async signIn(email: string, password: string): Promise<User> {
        return Promise.resolve({id: 1, email, password} as User)
      },
      async signUp(email: string, password: string): Promise<User> {
        return Promise.resolve({id: 1, email, password} as User)
      },
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: UsersService, useValue: fakeUserService},
        {provide: AuthService, useValue: faceAuthService}
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it ('findAllUsers returns a list of users with given email',async () => {
    const email = 'email@gmail.com';
    const users = await controller.findAllUsers(email);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(email);
  });

  it ('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it ('findUser return null if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    const user = controller.findUser('1');
    expect(user).toEqual(null);
  });

  it ('signin updates session object and returns user', async () => {
    const session: {userId?: number} = {};
    const user = await controller.signIn({email: 'email@gmail.com', password: 'pass'}, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  });
});
