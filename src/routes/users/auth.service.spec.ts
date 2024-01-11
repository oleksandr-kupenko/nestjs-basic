import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  const users: User[] = [];
  beforeEach(async () => {
    //create copy of the users service
    fakeUserService = {
      find: (email: string) => {
        const foundedUsers = users.filter(user => user.email === email);
        return Promise.resolve(foundedUsers);
      },
      create: (email: string, password: string) => {
        const user = {id: Math.floor(Math.random() * 99999), email, password} as User
        users.push(user);
        return Promise.resolve(user);
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService
        }
      ]
    }).compile();

    service = module.get(AuthService);
  });

  it ('can create instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const password = 'ss123456'
    const user = await service.signUp('test@gmail.com', password);

    expect(user.password).not.toEqual(password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it ('throws an error if user singe up with email that is in use', async () => {
    fakeUserService.find = () => Promise.resolve([{id: 1, email: 'a', password: '1'} as User]);

    await expect(service.signUp('test@gmail.com', 'ss123456')).rejects.toThrow(BadRequestException);
  });

  it ('throws if signin is called with an unused email', async () => {
    await expect(service.signIn('fds@gmail.com', 'qwerty')).rejects.toThrow(NotFoundException);
  });

  it ('throws if invalid password provided', async () => {
    const email = 'dafsd@gmail2.com';
    const password = 'mypassword';
    await service.signUp(email, password);
    await expect(service.signIn(email, password + 'wrong_pass')).rejects.toThrow(BadRequestException);
  });

  it ('returns a user if correct password is provided', async () => {
    const email = 'dafsd@gmail.com';
    const password = 'mypassword';
    await service.signUp(email, password);
    const user = await service.signIn(email, password);
    expect(user).toBeDefined();
  });
});

