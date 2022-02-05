import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { EmployeeService } from '../src/services/employee.services';
import { Model, model, connect } from 'mongoose';
import { IEmployees } from 'src/interface/employee.interface';
import { EmployeeSchema } from '../src/models/employee.schema';
connect(process.env.MONGO_DB_TEST_URI).then(() => console.log('db connected'));

const employeesData = [
  {
    name: 'mikel',
    email: 'mikel@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('0245118899'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
  {
    name: 'dunamis',
    email: 'dunamis@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('0245119878'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
  {
    name: 'amisdun',
    email: 'amisdun@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('0245111234'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
  {
    name: 'kofi',
    email: 'kofi@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('0245113456'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
  {
    name: 'mike',
    email: 'mike@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('0245112233'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
];

const deletedEmployee = [
  {
    name: 'mike',
    email: 'mike11@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('02422112233'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    is_deleted: true,
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
  {
    name: 'mike',
    email: 'mike22@gmail.com',
    dateOfBirth: new Date('2022-02-04T12:49:32.699Z'),
    phoneNumber: parseInt('024514412233'),
    dateOfEmployment: new Date('2022-02-04T12:49:32.699Z'),
    is_deleted: true,
    homeAddress: {
      city: 'Accra',
      zipCode: parseInt('11223'),
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    },
  },
];
const EmployeeModel: Model<IEmployees> = model('Employee', EmployeeSchema);

describe('Test For Employee Endpoints (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    await EmployeeModel.insertMany([...employeesData, ...deletedEmployee]);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should get all Employees with limit set to 5 and current page set to 1', async () => {
    const result = await request(app.getHttpServer()).get(
      '/employee?limit=5&currentPage=1',
    );
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.body.data.data.length).toBe(5);
  });
  it('Should fetch employee by ID', async () => {
    const data = {
      name: 'mikel',
      email: 'mikedunamis1@gmail.com',
      dateOfBirth: '2022-02-04T12:49:32.699Z',
      phoneNumber: '0245228669',
      dateOfEmployment: '2022-02-04T12:49:32.699Z',
      homeAddress: {
        city: 'Accra',
        zipCode: parseInt('11223'),
        addressLine1: 'this is my address',
        addressLine2: 'this is my address',
      },
    };
    const newData = await EmployeeModel.create({ ...data });
    const result = await request(app.getHttpServer()).get(
      `/employee/${newData._id}`,
    );
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.body.message).toBe('OK');
  });
  it('Should create an employee with details', async () => {
    const data = {
      name: 'mikel',
      email: 'mikedunamis@gmail.com',
      dateOfBirth: '2022-02-04T12:49:32.699Z',
      phoneNumber: '0245118669',
      dateOfEmployment: '2022-02-04T12:49:32.699Z',
      type: 'single',
      city: 'Accra',
      zipCode: '11223',
      addressLine1: 'this is my address',
      addressLine2: 'this is my address',
    };
    const result = await request(app.getHttpServer())
      .post('/employee/create')
      .send({ ...data });
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.body.message).toBe('OK');
  });
  it('Should update a particular employee', async () => {
    const data = {
      name: 'mikel',
      email: 'mikedunamis1@gmail.com',
      dateOfBirth: '2022-02-04T12:49:32.699Z',
      phoneNumber: '0245228669',
      dateOfEmployment: '2022-02-04T12:49:32.699Z',
      homeAddress: {
        city: 'Accra',
        zipCode: parseInt('11223'),
        addressLine1: 'this is my address',
        addressLine2: 'this is my address',
      },
    };
    const newData = await EmployeeModel.create({ ...data });
    const result = await request(app.getHttpServer())
      .put(`/employee/${newData._id}`)
      .send({ name: 'dunamis' });
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.body.data.name).toBe('dunamis');
  });
  it('Should delete a use by ID', async () => {
    const data = {
      name: 'mikel',
      email: 'mikedunamis1@gmail.com',
      dateOfBirth: '2022-02-04T12:49:32.699Z',
      phoneNumber: '0245228669',
      dateOfEmployment: '2022-02-04T12:49:32.699Z',
      homeAddress: {
        city: 'Accra',
        zipCode: parseInt('11223'),
        addressLine1: 'this is my address',
        addressLine2: 'this is my address',
      },
    };
    const newData = await EmployeeModel.create({ ...data });
    const result = await request(app.getHttpServer()).delete(
      `/employee/${newData._id}`,
    );
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.body.message).toBe('resources deleted');
  });
  it('Should get all deleted employees', async () => {
    const result = await request(app.getHttpServer()).get(
      '/employee/deleted/employees',
    );
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect(result.body.data.data.length).toBe(3);
  });
  afterAll(async () => {
    await EmployeeModel.deleteMany({});
    await app.close();
  });
});
