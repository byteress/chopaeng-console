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
  type ColumnFiltersState,
} from '@tanstack/react-table';
import Topbar from '../../components/layout/Topbar';
import Button from '../../components/ui/Button';
import { getFlightLogs } from '../../services/fakeApi';
import type { FlightLogEntry } from '../../types/flightLog';

const statusColors: Record<FlightLogEntry['status'], { bg: string; text: string; dot: string }> = {
  AUTHORIZED: { bg: '#e8f5e9', text: '#28a745', dot: '#28a745' },
  WARNED:     { bg: '#fff3e0', text: '#f4a261', dot: '#f4a261' },
};

const STATUS_FILTERS = ['All', 'AUTHORIZED', 'WARNED'] as const;

export default function LogsPage() {
  const [logs, setLogs] = useState<FlightLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | FlightLogEntry['status']>('All');

  useEffect(() => {
    getFlightLogs().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const filteredLogs = useMemo(
    () => (statusFilter === 'All' ? logs : logs.filter(l => l.status === statusFilter)),
    [logs, statusFilter],
  );

  const columns = useMemo<ColumnDef<FlightLogEntry>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => (
          <span className="text-xs font-mono text-[#8a7f6e]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'detectedAt',
        header: 'Detected',
        cell: info => (
          <span className="text-xs text-[#5e564d]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'travelerIGN',
        header: 'Traveler (IGN)',
        cell: info => (
          <span className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'originIsland',
        header: 'Origin',
        cell: info => (
          <span className="text-sm text-[#5e564d]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            🏝️ {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'destination',
        header: 'Destination',
        cell: info => (
          <span className="text-sm text-[#5e564d]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            ✈️ {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'rejoinAttempts',
        header: 'Rejoins',
        cell: info => {
          const val = info.getValue<number | undefined>();
          if (!val) return <span className="text-xs text-[#c8c0a8]" style={{ fontFamily: "'Nunito', sans-serif" }}>—</span>;
          return (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#fce4ec', color: '#e91e63', fontFamily: "'Nunito', sans-serif" }}
            >
              🔁 {val}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => {
          const val = info.getValue<FlightLogEntry['status']>();
          const colors = statusColors[val];
          return (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: colors.bg, color: colors.text, fontFamily: "'Nunito', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} />
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: 'actionBy',
        header: 'Action By',
        cell: info => (
          <span className="text-xs text-[#5e564d]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            @{info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'target',
        header: 'Target',
        cell: info => {
          const val = info.getValue<string>();
          const isLinked = val !== 'Visitor (unlinked)';
          return (
            <span
              className="text-xs font-mono"
              style={{ color: isLinked ? '#2d9cdb' : '#b0a898', fontFamily: "'Nunito', sans-serif" }}
            >
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        cell: info => {
          const val = info.getValue<string | undefined>();
          if (!val) return <span className="text-xs text-[#c8c0a8]" style={{ fontFamily: "'Nunito', sans-serif" }}>—</span>;
          return (
            <span
              className="text-xs text-[#5e564d] line-clamp-2 max-w-xs"
              style={{ fontFamily: "'Nunito', sans-serif" }}
              title={val}
            >
              {val}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredLogs,
    columns,
    state: { globalFilter, sorting, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const totalWarned = logs.filter(l => l.status === 'WARNED').length;
  const totalAuthorized = logs.filter(l => l.status === 'AUTHORIZED').length;

  return (
    <div className="min-h-screen">
      <Topbar title="Flight Logger" />

      <div className="px-8 py-6">
        {/* Summary pills */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8', fontFamily: "'Nunito', sans-serif", color: '#2d4d5c' }}
          >
            ✈️ <span className="text-[#8a7f6e] font-semibold">Total Cases</span>
            <span className="ml-1">{logs.length}</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#e8f5e9', border: '1.5px solid #b7dfc0', fontFamily: "'Nunito', sans-serif", color: '#28a745' }}
          >
            ✅ Authorized
            <span className="ml-1">{totalAuthorized}</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: '#fff3e0', border: '1.5px solid #f4d0a1', fontFamily: "'Nunito', sans-serif", color: '#f4a261' }}
          >
            ⚠️ Warned
            <span className="ml-1">{totalWarned}</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          {/* Search */}
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
              placeholder="Search traveler, island, destination…"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm font-semibold text-[#2d4d5c] outline-none focus:ring-2 focus:ring-[#28a745]/40"
              style={{
                background: '#fffdf0',
                border: '1.5px solid #e8e0c8',
                fontFamily: "'Nunito', sans-serif",
              }}
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5 rounded-xl p-1" style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}>
            {STATUS_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: statusFilter === f
                    ? f === 'AUTHORIZED' ? '#28a745'
                      : f === 'WARNED' ? '#f4a261'
                      : '#2d4d5c'
                    : 'transparent',
                  color: statusFilter === f ? '#fff' : '#8a7f6e',
                }}
              >
                {f}
              </button>
            ))}
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
                          className="px-4 py-3.5 text-left text-xs font-extrabold tracking-wider text-[#8a7f6e] uppercase select-none whitespace-nowrap"
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
                  {table.getRowModel().rows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[#f7f4e8] transition-colors"
                      style={{ borderBottom: idx < table.getRowModel().rows.length - 1 ? '1px solid #f0ede0' : 'none' }}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-4 py-3 text-sm align-top">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-12 text-[#b0a898]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        No flight log entries found.
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
