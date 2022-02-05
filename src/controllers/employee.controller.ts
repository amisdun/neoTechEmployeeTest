import {
  Controller,
  Req,
  Res,
  Body,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from '../services/index';
import { successResponse, failureResponse } from '../utils/index';
import { response, Response } from 'express';
import { EmployeesDTO } from '../DTO/employees.dto';
import { IPagination } from 'src/interface/employee.interface';
import { Types } from 'mongoose';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  async getAllEmployees(
    @Res() response: Response,
    @Query('limit') limit: number,
    @Query('currentPage') currentPage: number,
  ) {
    try {
      const paginationData: IPagination = {
        limit,
        currentPage,
      };
      const data = await this.employeeService.getAllEmployees(paginationData);
      return successResponse(response, data);
    } catch (error) {
      return failureResponse(response, error);
    }
  }

  @Post('/create')
  async createEmployee(
    @Res() response: Response,
    @Body() EmployeeData: EmployeesDTO,
  ) {
    try {
      const data = await this.employeeService.addEmployee(EmployeeData);
      return successResponse(response, data);
    } catch (error) {
      return failureResponse(response, error);
    }
  }

  @Get('/:id')
  async getEmployee(@Res() response: Response, @Param('id') id: string) {
    try {
      const data = await this.employeeService.getEmployee(id);
      return successResponse(response, data);
    } catch (error) {
      return failureResponse(response, error);
    }
  }

  @Put('/:id')
  async updateEmployee(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() fieldsToUpdate: EmployeesDTO,
  ) {
    try {
      const data = await this.employeeService.updateEmployee(
        id,
        fieldsToUpdate,
      );
      return successResponse(response, data);
    } catch (error) {
      return failureResponse(response, error);
    }
  }

  @Delete('/:id')
  async deletedEmployee(@Res() response: Response, @Param('id') id: string) {
    try {
      await this.employeeService.deleteEmployee(id);
      return successResponse(response, {}, 'resources deleted');
    } catch (error) {
      return failureResponse(response, error);
    }
  }

  @Get('/deleted/employees')
  async getDeletedEmployees(
    @Res() response: Response,
    @Query('limit') limit: number,
    @Query('currentPage') currentPage: number,
  ) {
    try {
      const paginationData: IPagination = {
        limit,
        currentPage,
      };
      const data = await this.employeeService.getAllDeletedEmployees(
        paginationData,
      );
      return successResponse(response, data);
    } catch (error) {
      return failureResponse(response, error);
    }
  }
}
