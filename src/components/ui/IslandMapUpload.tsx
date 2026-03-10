import { useRef, useState } from 'react';

interface Props {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
}

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export default function IslandMapUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File) => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError('Only PNG, JPEG, WEBP, or GIF images are accepted.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Image must be smaller than 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    onChange(undefined);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        className="hidden"
        onChange={handleFileChange}
      />

      {value ? (
        /* ── Preview ── */
        <div
          className="relative rounded-xl overflow-hidden shadow-sm group"
          style={{ border: '1.5px solid #e8e0c8', background: '#f7f4e8' }}
        >
          <img
            src={value}
            alt="Island map preview"
            className="w-full object-cover"
            style={{ maxHeight: 220 }}
          />
          {/* Hover overlay with actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Replace
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-colors"
              style={{ background: 'rgba(233,30,99,0.75)', border: '1.5px solid rgba(233,30,99,0.5)' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload island map image"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl cursor-pointer transition-all"
          style={{
            border: `1.5px dashed ${dragOver ? '#28a745' : '#c8c0a8'}`,
            background: dragOver ? '#edf7ef' : '#f7f4e8',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: dragOver ? '#28a745' : '#e8e0c8' }}
          >
            <svg
              width="24" height="24" fill="none" viewBox="0 0 24 24"
              stroke={dragOver ? '#fff' : '#8a7f6e'} strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p
              className="text-sm font-bold text-[#2d4d5c]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {dragOver ? 'Drop to upload' : 'Click or drag & drop your map image'}
            </p>
            <p
              className="text-xs text-[#b0a898] mt-0.5"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              PNG, JPEG, WEBP or GIF · max 5 MB
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1.5 font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}
