import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from '../models/employee.schema';
import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeService } from '../services/employee.services';
import { Pagination } from '../utils/index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, Pagination],
})
export class EmployeeModule {}
