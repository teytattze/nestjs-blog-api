import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from 'src/modules/accounts/accounts.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '1024', nullable: true, default: null })
  token?: string | null;

  @Column({ type: 'varchar', length: '15', nullable: true, default: null })
  expires?: string | null;

  @OneToOne(() => Account, (account) => account.session, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account?: Account;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
