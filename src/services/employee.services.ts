import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IEmployees, IPagination } from '../interface/employee.interface';
import {
  assertDocumentExistById,
  assertDocumentExistByPhoneOrEmail,
} from '../utils/index';
import { EmployeesDTO } from '../DTO/employees.dto';
import { Pagination } from '../utils/index';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly Employees: Model<IEmployees>,
    private readonly Paginate: Pagination,
  ) {}

  async addEmployee(employeeData: EmployeesDTO): Promise<IEmployees> {
    await assertDocumentExistByPhoneOrEmail(
      this.Employees,
      employeeData.email,
      employeeData.phoneNumber,
    );
    const { city, zipCode, addressLine1, addressLine2, ...rest } = employeeData;
    const homeAddress = { city, zipCode, addressLine1, addressLine2 };
    const createEmployee = await this.Employees.create({
      homeAddress,
      ...rest,
    });
    return createEmployee;
  }

  async getAllEmployees(
    paginationData: IPagination,
  ): Promise<Record<string, any>> {
    const employees = await this.Paginate.paginationData(
      this.Employees,
      paginationData,
      { is_deleted: false },
    );

    return employees;
  }

  async getEmployee(employeeId: Types.ObjectId | string): Promise<IEmployees> {
    await assertDocumentExistById(this.Employees, employeeId);
    const employee = await this.Employees.findOne({
      _id: employeeId,
      is_deleted: false,
    });
    return employee;
  }

  async updateEmployee(
    employeeId: Types.ObjectId | string,
    dataToUpdate: EmployeesDTO,
  ): Promise<IEmployees> {
    await assertDocumentExistById(this.Employees, employeeId);
    const { city, zipCode, addressLine1, addressLine2, ...rest } = dataToUpdate;
    const homeAddress = { city, zipCode, addressLine1, addressLine2 };
    const updatedData = await this.Employees.findByIdAndUpdate(
      employeeId,
      { homeAddress, ...rest },
      { new: true },
    );
    return updatedData;
  }

  async deleteEmployee(employeeId: Types.ObjectId | string): Promise<any> {
    await assertDocumentExistById(this.Employees, employeeId);
    await this.Employees.findByIdAndUpdate(employeeId, { is_deleted: true });
    return true;
  }

  async getAllDeletedEmployees(
    paginationData: IPagination,
  ): Promise<Record<string, any>> {
    const deletedEmployees = await this.Paginate.paginationData(
      this.Employees,
      paginationData,
      { is_deleted: true },
    );
    return deletedEmployees;
  }
}
