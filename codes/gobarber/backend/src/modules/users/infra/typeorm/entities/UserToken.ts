import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
