import { useEffect, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import Topbar from '../../components/layout/Topbar';
import Button from '../../components/ui/Button';
import { getWarnings } from '../../services/fakeApi';
import type { Warning } from '../../types/warning';
import { modNames } from '../../mock/warnings';

const formatTs = (ts: number) => {
  const d = new Date(ts * 1000);
  return d.toLocaleString('en-GB', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
};

const modLabel = (modId: string) => modNames[modId] ?? modId;

export default function WarningsPage() {
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'timestamp', desc: true }]);

  useEffect(() => {
    getWarnings().then((data) => {
      setWarnings(data);
      setLoading(false);
    });
  }, []);

  const columns = useMemo<ColumnDef<Warning>[]>(
    () => [
      {
        accessorKey: 'user_id',
        header: 'User ID',
        cell: info => (
          <span className="text-xs font-mono text-[#2d9cdb]">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'guild_id',
        header: 'Guild ID',
        cell: info => (
          <span className="text-xs font-mono text-[#8a7f6e]">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'mod_id',
        header: 'Moderator',
        cell: info => (
          <span className="text-sm font-semibold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            @{modLabel(info.getValue<string>())}
          </span>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Date',
        cell: info => (
          <span className="text-xs text-[#5e564d]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {formatTs(info.getValue<number>())}
          </span>
        ),
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        cell: info => (
          <span
            className="text-xs text-[#5e564d] line-clamp-2 max-w-sm block"
            style={{ fontFamily: "'Nunito', sans-serif" }}
            title={info.getValue<string>()}
          >
            {info.getValue<string>()}
          </span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: warnings,
    columns,
    state: { globalFilter, sorting },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  // Count warnings per user_id for the "repeat offender" badge
  const warnCounts = useMemo(() => {
    const map: Record<string, number> = {};
    warnings.forEach(w => {
      map[w.user_id] = (map[w.user_id] ?? 0) + 1;
    });
    return map;
  }, [warnings]);

  const repeatOffenders = Object.keys(warnCounts).filter(id => warnCounts[id] > 1).length;

  return (
    <div className="min-h-screen">
      <Topbar title="Warnings" />

      <div className="px-8 py-6">
        {/* Summary pills */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8', fontFamily: "'Nunito', sans-serif", color: '#2d4d5c' }}
          >
            ⚠️ <span className="text-[#8a7f6e] font-semibold">Total Warnings</span>
            <span className="ml-1">{warnings.length}</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#fce4ec', border: '1.5px solid #f4b8cb', fontFamily: "'Nunito', sans-serif", color: '#e91e63' }}
          >
            🔁 Repeat Offenders
            <span className="ml-1">{repeatOffenders}</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#e3f2fd', border: '1.5px solid #b3d4f0', fontFamily: "'Nunito', sans-serif", color: '#2d9cdb' }}
          >
            👤 Unique Users
            <span className="ml-1">{Object.keys(warnCounts).length}</span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a898]"
              width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search user, moderator, reason…"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm font-semibold text-[#2d4d5c] outline-none focus:ring-2 focus:ring-[#28a745]/40"
              style={{
                background: '#fffdf0',
                border: '1.5px solid #e8e0c8',
                fontFamily: "'Nunito', sans-serif",
              }}
            />
          </div>
          <span className="text-xs text-[#8a7f6e] font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {table.getFilteredRowModel().rows.length} entries
          </span>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden shadow-sm"
          style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-[#28a745]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id} style={{ borderBottom: '1.5px solid #e8e0c8' }}>
                      {hg.headers.map(header => (
                        <th
                          key={header.id}
                          className="px-5 py-3.5 text-left text-xs font-extrabold tracking-wider text-[#8a7f6e] uppercase select-none whitespace-nowrap"
                          style={{
                            fontFamily: "'Nunito', sans-serif",
                            cursor: header.column.getCanSort() ? 'pointer' : 'default',
                            background: '#f7f4e8',
                          }}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center gap-1.5">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <span className="text-[#c8c0a8]">
                                {header.column.getIsSorted() === 'asc' ? '↑' : header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, idx) => {
                    const count = warnCounts[row.original.user_id] ?? 0;
                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-[#f7f4e8] transition-colors"
                        style={{
                          borderBottom: idx < table.getRowModel().rows.length - 1 ? '1px solid #f0ede0' : 'none',
                          background: count > 1 ? 'rgba(252,228,236,0.35)' : undefined,
                        }}
                      >
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-5 py-3.5 text-sm align-top">
                            {/* Repeat offender badge on user_id column */}
                            {cell.column.id === 'user_id' && count > 1 ? (
                              <div className="flex items-center gap-1.5">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                <span
                                  className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full"
                                  style={{ background: '#fce4ec', color: '#e91e63', fontFamily: "'Nunito', sans-serif" }}
                                  title={`${count} warnings`}
                                >
                                  ×{count}
                                </span>
                              </div>
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-12 text-[#b0a898]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        No warnings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-[#8a7f6e] font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                ← Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
