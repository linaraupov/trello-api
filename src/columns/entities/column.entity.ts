import { Card } from 'src/cards/entities';
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

const tableName = 'columns';

@Entity(tableName)
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DBColumn({ type: 'text' })
  name: string;

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @DBColumn('uuid')
  userId: string;

  @OneToMany(() => Card, (card) => card.column, {
    cascade: true,
  })
  cards: Card[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
