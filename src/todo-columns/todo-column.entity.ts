import { TodoCard } from 'src/todo-cards/todo-card.entity';
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

const tableName = 'todo_columns';

@Entity(tableName)
export class TodoColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @ManyToOne(() => User, (user) => user.todoColumns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('uuid')
  userId: string;

  @OneToMany(() => TodoCard, (card) => card.todoColumn, {
    cascade: true,
  })
  todoCards: TodoCard[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
