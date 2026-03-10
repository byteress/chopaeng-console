import React from 'react';

interface TopbarProps {
  title: string;
  action?: React.ReactNode;
}

export default function Topbar({ title, action }: TopbarProps) {
  return (
    <div
      className="flex items-center justify-between px-8 py-5 sticky top-0 z-20"
      style={{
        background: 'rgba(242, 244, 230, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1.5px solid #e0ddd0',
      }}
    >
      <h1
        className="text-2xl text-[#2d4d5c]"
        style={{ fontFamily: "'Fredoka One', cursive" }}
      >
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {action && <div>{action}</div>}

        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
            style={{ background: '#28a745', fontFamily: "'Nunito', sans-serif" }}
          >
            B
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>
              bitress
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
