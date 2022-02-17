import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder } from 'typeorm';

export async function getPaginateResponse<T>(qb: SelectQueryBuilder<T>, param: IPaginationOptions) {
  const { items, meta } = await paginate(qb, param);
  const { currentPage, itemCount, totalItems, totalPages } = meta;
  return {
    data: items,
    count: itemCount,
    total: totalItems,
    page: currentPage,
    pageCount: totalPages,
  };
}
