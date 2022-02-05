import { validate } from 'class-validator';
import { EmployeesDTO } from '../DTO/employees.dto';
import { Response, Request, NextFunction } from 'express';
import { failureResponse } from '../utils/response';

export const customerValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void | Response<Record<string, any>>> => {
  let validateEmployeeData = new EmployeesDTO();
  const {
    name,
    email,
    phoneNumber,
    dateOfBirth,
    dateOfEmployment,
    city,
    zipCode,
    addressLine1,
    addressLine2,
    type,
  } = request.body as EmployeesDTO;
  validateEmployeeData.name = name;
  validateEmployeeData.email = email;
  validateEmployeeData.phoneNumber = phoneNumber;
  validateEmployeeData.dateOfBirth = dateOfBirth;
  validateEmployeeData.dateOfEmployment = dateOfEmployment;
  validateEmployeeData.city = city;
  validateEmployeeData.type = type;
  validateEmployeeData.zipCode = zipCode;
  validateEmployeeData.addressLine1 = addressLine1;
  validateEmployeeData.addressLine2 = addressLine2;

  const errors = await validate(validateEmployeeData);
  if (errors.length) {
    return failureResponse(
      response,
      errors.map((err) => err.constraints),
    );
  }
  return next();
};
