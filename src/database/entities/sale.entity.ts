import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
  } from 'typeorm';
  import { Customer } from './customer.entity';
  import { SalesRep } from './sales-rep.entity';
  import { Product } from './product.entity';
  
  @Entity('sales')
  @Index(['saleDate'])
  export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
  
    @ManyToOne(() => SalesRep)
    @JoinColumn({ name: 'sales_rep_id' })
    salesRep: SalesRep;
  
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
  
    @Column()
    quantity: number;
  
    @Column('decimal', { precision: 12, scale: 2 })
    totalAmount: number;
  
    @Column({ type: 'date' })
    saleDate: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;
  }