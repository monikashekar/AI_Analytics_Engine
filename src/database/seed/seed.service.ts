import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Customer } from '../entities/customer.entity';
import { SalesRep } from '../entities/sales-rep.entity';
import { Product } from '../entities/product.entity';
import { Sale } from '../entities/sale.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepo: Repository<Customer>,
      
        @InjectRepository(SalesRep)
        private readonly salesRepRepo: Repository<SalesRep>,
      
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
      
        @InjectRepository(Sale)
        private readonly saleRepo: Repository<Sale>,
      ) {}
  
  async seed() {
    console.log('🌱 Seeding database...');

    // 1️⃣ Create Sales Reps
    const reps: SalesRep[] = [];

    for (let i = 0; i < 10; i++) {
      reps.push(
        this.salesRepRepo.create({
          name: faker.person.fullName(),
          region: faker.location.country(),
          hireDate: faker.date.past(),
        }),
      );
    }
    await this.salesRepRepo.save(reps);

    // 2️⃣ Create Customers
    const customers: Customer[] = [];

    for (let i = 0; i < 50; i++) {
     customers.push(
    this.customerRepo.create({
      name: faker.company.name(),
      region: faker.location.country(),
      industry: faker.company.buzzNoun(),
    }),
  );
}
await this.customerRepo.save(customers);

    // 3️⃣ Create Products
    const products: Product[] = [];

    for (let i = 0; i < 20; i++) {
      products.push(
        this.productRepo.create({
          name: faker.commerce.productName(),
          category: faker.commerce.department(),
          price: Number(faker.commerce.price({ min: 100, max: 5000 })),
        }),
      );
    }
    
    await this.productRepo.save(products);

    // 4️⃣ Create Sales Records
    for (let i = 0; i < 3000; i++) {
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 10 });
      
        const sale = this.saleRepo.create({
          customer: faker.helpers.arrayElement(customers),
          salesRep: faker.helpers.arrayElement(reps),
          product,
          quantity,
          totalAmount: quantity * Number(product.price),
          saleDate: faker.date.recent({ days: 365 }),
        });
      
        await this.saleRepo.save(sale);
      }

    console.log('✅ Seeding complete!');
  }
}