import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  create(email: string, password: string) {
    const user = this.repo.create({email, password});
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
   return  this.repo.findOne({where: {id}});
  }

  find(email: string) {
    return this.repo.findBy({ email: email });
  }
  findAmongUsers(email: string) {
    return this.repo.findBy({
      email: Like(`%${email}%`),
    });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = {...user, ...attrs}
    return this.repo.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
