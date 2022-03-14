import { Comment } from 'src/comments/comment.entity';
import { TodoColumn } from 'src/todo-columns/todo-column.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const tableName = 'todo_cards';

@Entity({ name: tableName })
export class TodoCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => TodoColumn, (column) => column.todoCards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoColumnId' })
  todoColumn: TodoColumn;

  @Column('uuid')
  todoColumnId: string;

  @ManyToOne(() => User, (user) => user.todoCards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid')
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.todoCard, { cascade: true })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
