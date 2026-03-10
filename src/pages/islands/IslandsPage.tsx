import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
import { getIslands, deleteIsland } from '../../services/fakeApi';
import type { IslandData } from '../../types/island';

export default function IslandsPage() {
  const [islands, setIslands] = useState<IslandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getIslands().then((data) => {
      setIslands(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this island? This cannot be undone.')) return;
    setDeletingId(id);
    // Optimistic update
    setIslands(prev => prev.filter(i => i.id !== id));
    await deleteIsland(id);
    setDeletingId(null);
  }, []);

  const typeColor = (type: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      Trade: { bg: '#e8f5e9', text: '#28a745' },
      Active: { bg: '#e3f2fd', text: '#2d9cdb' },
      Resource: { bg: '#fff3e0', text: '#f4a261' },
      Showcase: { bg: '#f3e5f5', text: '#9b59b6' },
      Event: { bg: '#fce4ec', text: '#e91e63' },
    };
    return map[type] ?? { bg: '#f5f5f5', text: '#666' };
  };

  const columns = useMemo<ColumnDef<IslandData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => (
          <span className="text-xs font-mono text-[#8a7f6e]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'mapImage',
        header: 'Map',
        enableSorting: false,
        cell: info => {
          const src = info.getValue<string | undefined>();
          return src ? (
            <img
              src={src}
              alt="Island map"
              className="w-10 h-10 rounded-lg object-cover"
              style={{ border: '1.5px solid #e8e0c8' }}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: '#f0ede0', border: '1.5px solid #e8e0c8' }}
              title="No map uploaded"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#c8c0a8" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: info => (
          <span className="font-bold text-[#2d4d5c]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: info => {
          const val = info.getValue<string>();
          const colors = typeColor(val);
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
        accessorKey: 'cat',
        header: 'Category',
        cell: info => (
          <span className="text-sm text-[#5e564d]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'theme',
        header: 'Theme',
        cell: info => (
          <span className="text-sm text-[#5e564d]">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'seasonal',
        header: 'Seasonal',
        cell: info => {
          const val = info.getValue<string>();
          return (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: val === 'Yes' ? '#fff8e1' : '#f5f5f5',
                color: val === 'Yes' ? '#f4a261' : '#9e9e9e',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {val === 'Yes' ? '🌸 Yes' : 'No'}
            </span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: info => (
          <div className="flex items-center gap-2">
            <Link to={`/islands/edit/${info.row.original.id}`}>
              <Button variant="secondary" size="sm">Edit</Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              loading={deletingId === info.row.original.id}
              onClick={() => handleDelete(info.row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [deletingId, handleDelete]
  );

  const table = useReactTable({
    data: islands,
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
      <Topbar
        title="Islands"
        action={
          <Link to="/islands/create">
            <Button variant="primary" size="md">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Island
            </Button>
          </Link>
        }
      />

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
              placeholder="Search islands..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm font-semibold text-[#2d4d5c] outline-none focus:ring-2 focus:ring-[#28a745]/40"
              style={{
                background: '#fffdf0',
                border: '1.5px solid #e8e0c8',
                fontFamily: "'Nunito', sans-serif",
              }}
            />
          </div>
          <span className="text-xs text-[#8a7f6e] font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {table.getFilteredRowModel().rows.length} islands
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
                        No islands found.
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
