import {
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type addressType = 'single' | 'split';

export class EmployeesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((val) => parseInt(val.value))
  phoneNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((val) => new Date(val.value))
  dateOfEmployment: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((val) => new Date(val.value))
  dateOfBirth: Date;

  type: addressType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((val) => parseInt(val.value))
  zipCode: number;

  @ApiProperty()
  @IsString()
  addressLine1: string;

  @ValidateIf((val) => val.type === 'single' || val.type === undefined)
  @IsString()
  addressLine2: string;
}
