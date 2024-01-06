import { AfterInsert, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()// need to skip the password (with @UseInterceptors in controller)
  password: string;

  @BeforeInsert()
  logInsert() {
    this.email = 'new@ukr.net'
    console.log('AFTER EMAIL', this.email);
  }
}
