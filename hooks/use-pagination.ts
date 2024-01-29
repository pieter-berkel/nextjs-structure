type UsePaginationProps = {
  count: number;
  page: number;
  siblingCount?: number;
};

type UsePaginationReturn = ("previous" | "next" | "ellipsis" | number)[];

export const usePagination = (props: UsePaginationProps) => {
  const { count, page, siblingCount = 1 } = props;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const siblingStart = Math.max(
    Math.min(page - siblingCount, count - siblingCount * 2 - 2),
    3
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, siblingCount * 2 + 3),
    count > 0 ? count - 2 : count - 1
  );

  return [
    ...(page > 1 ? ["previous"] : []),
    ...(count > 1 ? [1] : []),
    ...(siblingStart > 3 ? ["ellipsis"] : 2 < count - 1 ? [2] : []),
    ...range(siblingStart, siblingsEnd),
    ...(siblingsEnd < count - 2
      ? ["ellipsis"]
      : count - 1 > 1
      ? [count - 1]
      : []),
    ...(count > 1 ? [count] : []),
    ...(page < count ? ["next"] : []),
  ] as UsePaginationReturn;
};
