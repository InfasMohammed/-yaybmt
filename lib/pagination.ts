export const pageSize = 12;
export const pagePath = (base: string, page: number) =>
  page === 1 ? base : base + "page/" + page + "/";
export const pageNumbers = (count: number) =>
  Array.from(
    { length: Math.max(1, Math.ceil(count / pageSize)) },
    (_, i) => i + 1,
  );
