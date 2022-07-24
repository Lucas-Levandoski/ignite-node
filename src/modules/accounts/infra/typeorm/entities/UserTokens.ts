import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { User } from './User';


@Entity('users_token')
export class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'expires_date' })
  expiresDate: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidV4();
  }
}