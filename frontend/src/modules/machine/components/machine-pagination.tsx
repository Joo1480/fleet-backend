"use client";

type MachinePaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function MachinePagination({
  page,
  pageSize,
  total,
  onPageChange,
}: MachinePaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3">
      <span className="text-sm text-[var(--muted)]">
        Mostrando {start}–{end} de {total} máquinas
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-[var(--border)] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const current = index + 1;

          return (
            <button
              key={current}
              onClick={() => onPageChange(current)}
              className={`h-8 w-8 rounded-md text-sm transition ${
                current === page
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {current}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-[var(--border)] px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}