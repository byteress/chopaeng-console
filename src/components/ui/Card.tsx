import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  color?: string;
}

export default function Card({ title, value, icon, trend, color = '#28a745' }: CardProps) {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default"
      style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p
            className="text-xs font-bold tracking-widest uppercase text-[#8a7f6e] mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {title}
          </p>
          <p
            className="text-3xl font-extrabold text-[#2d4d5c]"
            style={{ fontFamily: "'Fredoka One', cursive", color }}
          >
            {value}
          </p>
          {trend && (
            <p className="text-xs text-[#8a7f6e] mt-1 font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {trend}
            </p>
          )}
        </div>
        {icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
            style={{ background: color }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
