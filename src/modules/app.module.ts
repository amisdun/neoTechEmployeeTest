import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from '../controllers/index';
import { AppService } from '../services/index';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee.module';
import { customerValidation } from '../middlewares/employeeValidationMiddleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_DB_TEST_URI
        : process.env.MONGO_DB_URI,
      {
        useNewUrlParser: true,
      },
    ),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(customerValidation)
      .forRoutes({ path: 'employee/create', method: RequestMethod.POST });
  }
}
