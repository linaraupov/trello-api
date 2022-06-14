import {
  BeforeInsert,
  BeforeUpdate,
  Column as DBColumn,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import crypto from 'crypto';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column } from 'src/columns/entities';
import { Card } from 'src/cards/entities';

const TABLE_NAME = 'users';

@Entity({ name: TABLE_NAME })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DBColumn({ type: 'text' })
  name: string;

  @DBColumn({ type: 'text', unique: true })
  email: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
  }

  @DBColumn({ type: 'text' })
  password: string;

  @OneToMany(() => Column, (column) => column.user, { cascade: true })
  columns: Column[];

  @OneToMany(() => Card, (card) => card.user, { cascade: true })
  cards: Card[];

  @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
