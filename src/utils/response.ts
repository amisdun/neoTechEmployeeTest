import { HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

export const successResponse = (
  response: Response,
  data: [] | {},
  message: string = 'OK',
  statusCode: HttpStatus = HttpStatus.OK,
): Response => {
  return response.status(statusCode).json({
    data,
    message,
  });
};

export const failureResponse = (
  response: Response,
  message: string | Error | ValidationError[] | HttpException | Array<{}>,
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): Response => {
  return response.status(statusCode).json({
    message: message instanceof Error ? message?.message : message,
  });
};
