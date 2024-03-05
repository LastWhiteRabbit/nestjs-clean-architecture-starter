import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 150, nullable: false })
  name: string;

  @Column('varchar', { length: 50, nullable: true })
  shortName: string;

  @Column('varchar', { length: 2000, nullable: true })
  description: string;

  @Column('varchar', { length: 2000, nullable: true })
  shortDescription: string;

  @CreateDateColumn({ name: 'createdate' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updatedDate: Date;
}
