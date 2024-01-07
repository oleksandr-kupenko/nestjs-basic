import { AfterInsert, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  logInsert() {
    this.email = 'new@ukr.net'
    console.log('AFTER EMAIL', this.email);
  }
}
