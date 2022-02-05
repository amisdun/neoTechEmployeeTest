import { IPagination } from 'src/interface/employee.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Pagination {
  async paginationData(
    model: any,
    paginationParams: IPagination,
    queryOptions: {},
  ) {
    const { limit = 10, currentPage = 1 } = paginationParams;
    const paginatedData = await model
      .find({ ...queryOptions })
      .limit(limit)
      .skip((currentPage - 1) * limit);
    const totalPage = Math.ceil(
      (await model.find({ ...queryOptions }).count()) / limit,
    );
    const nextPage = totalPage > currentPage ? 1 + Number(currentPage) : null;
    const parseCurrent = Number(currentPage);

    return {
      data: paginatedData,
      currentPage: parseCurrent,
      nextPage,
      totalPage,
    };
  }
}
