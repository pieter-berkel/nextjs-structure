"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePagination } from "~/hooks/use-pagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type PaginatorProps = {
  count: number;
};

export const Paginator = ({ count }: PaginatorProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pagination = usePagination({
    count,
    page,
  });

  return (
    <Pagination>
      <PaginationContent>
        {pagination.map((item, i) => {
          let content = null;

          switch (item) {
            case "previous":
              content = <PaginationPrevious href={createPageURL(page - 1)} />;
              break;
            case "next":
              content = <PaginationNext href={createPageURL(page + 1)} />;
              break;
            case "ellipsis":
              content = <PaginationEllipsis />;
              break;
            default:
              content = (
                <PaginationLink
                  href={createPageURL(item)}
                  isActive={page === Number(item)}
                >
                  {item}
                </PaginationLink>
              );
              break;
          }

          return (
            <PaginationItem key={`${item}-${i}`}>{content}</PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
