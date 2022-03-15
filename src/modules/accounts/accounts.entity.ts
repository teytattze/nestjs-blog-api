import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from '../auth/sessions/sessions.entity';
import { Post } from '../posts/posts.entity';
import { AccountRole } from './accounts.enum';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: AccountRole, default: AccountRole.MEMBER })
  role: AccountRole;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @OneToMany(() => Post, (posts) => posts.author)
  posts?: Post[];

  @OneToOne(() => Session, (session) => session.account, {
    cascade: true,
  })
  session?: Session;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
