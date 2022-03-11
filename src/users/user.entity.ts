import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import crypto from 'crypto';
import { TodoColumn } from 'src/todo-columns/todo-column.entity';
import { TodoCard } from 'src/todo-cards/todo-card.entity';
import { Comment } from 'src/comments/comment.entity';

const TABLE_NAME = 'users';

@Entity({ name: TABLE_NAME })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
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

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => TodoColumn, (todoColumn) => todoColumn.user, { cascade: true })
  todoColumns: TodoColumn[];

  @OneToMany(() => TodoCard, (card) => card.user, { cascade: true })
  todoCards: TodoCard[];

  @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
