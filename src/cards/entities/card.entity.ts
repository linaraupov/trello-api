import { Column } from 'src/columns/entities';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities';
import {
  Column as DBColumn,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const tableName = 'cards';

@Entity({ name: tableName })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DBColumn({ type: 'text' })
  name: string;

  @DBColumn({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Column, (column) => column.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column: Column;

  @DBColumn('uuid')
  columnId: string;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @DBColumn('uuid')
  userId: string;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
