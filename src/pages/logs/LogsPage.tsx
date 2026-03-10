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
import { getLogs } from '../../services/fakeApi';
import type { LogEntry } from '../../mock/logs';

const eventColor = (event: string): { bg: string; text: string } => {
  if (event.toLowerCase().startsWith('error')) return { bg: '#fce4ec', text: '#e91e63' };
  if (event.toLowerCase().includes('warning')) return { bg: '#fff3e0', text: '#f4a261' };
  if (event.toLowerCase().includes('offline') || event.toLowerCase().includes('disconnected')) return { bg: '#f5f5f5', text: '#9e9e9e' };
  if (event.toLowerCase().includes('online') || event.toLowerCase().includes('connected')) return { bg: '#e8f5e9', text: '#28a745' };
  if (event.toLowerCase().includes('kicked')) return { bg: '#fce4ec', text: '#e91e63' };
  return { bg: '#e3f2fd', text: '#2d9cdb' };
};

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    getLogs().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const columns = useMemo<ColumnDef<LogEntry>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => (
          <span className="text-xs font-mono text-[#8a7f6e]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        cell: info => (
          <span className="text-sm text-[#5e564d]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'event',
        header: 'Event',
        cell: info => {
          const val = info.getValue<string>();
          const colors = eventColor(val);
          return (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: colors.bg, color: colors.text, fontFamily: "'Nunito', sans-serif" }}
            >
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: 'islandId',
        header: 'Island',
        cell: info => (
          <span className="text-xs font-mono text-[#8a7f6e]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'playerId',
        header: 'Player',
        cell: info => (
          <span className="text-xs font-mono text-[#8a7f6e]">{info.getValue<string>()}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: logs,
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

  return (
    <div className="min-h-screen">
      <Topbar title="Logs" />

      <div className="px-8 py-6">
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
              placeholder="Search logs..."
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
                          className="px-5 py-3.5 text-left text-xs font-extrabold tracking-wider text-[#8a7f6e] uppercase select-none"
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
                        <td key={cell.id} className="px-5 py-3.5 text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className="text-center py-12 text-[#b0a898]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        No log entries found.
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
