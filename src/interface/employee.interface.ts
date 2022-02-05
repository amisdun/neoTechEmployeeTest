import { Document } from 'mongoose';

interface IHomeAddress {
  city: string;
  zipCode: number;
  addressLine1: string;
  addressLine2: string;
}

export interface IEmployees extends Document {
  name: string;
  email: string;
  phoneNumber: number;
  homeAddress: IHomeAddress;
  dateOfEmployment: Date;
  dateOfBirth: Date;
}

export interface IPagination {
  currentPage: number;
  limit: number;
}
