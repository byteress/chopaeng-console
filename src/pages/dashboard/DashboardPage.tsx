import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Topbar from '../../components/layout/Topbar';
import Card from '../../components/ui/Card';
import { getIslands } from '../../services/fakeApi';
import type { IslandData } from '../../types/island';

const visitData = [
  { day: 'Mon', visits: 34 },
  { day: 'Tue', visits: 52 },
  { day: 'Wed', visits: 47 },
  { day: 'Thu', visits: 68 },
  { day: 'Fri', visits: 91 },
  { day: 'Sat', visits: 113 },
  { day: 'Sun', visits: 78 },
];

export default function DashboardPage() {
  const [islands, setIslands] = useState<IslandData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIslands().then((data) => {
      setIslands(data);
      setLoading(false);
    });
  }, []);

  const totalIslands = islands.length;
  const activeIslands = islands.filter(i =>
    ['Active', 'Trade', 'Resource', 'Event'].includes(i.type)
  ).length;
  const seasonalIslands = islands.filter(i => i.seasonal === 'Yes').length;
  const totalItems = islands.reduce((sum, i) => sum + i.items.length, 0);

  return (
    <div className="min-h-screen">
      <Topbar title="Dashboard" />

      <div className="px-8 py-6 space-y-8">
        {/* Welcome */}
        <div
          className="rounded-2xl p-6 flex items-center gap-5"
          style={{
            background: 'linear-gradient(135deg, #28a745 0%, #4a9d6f 100%)',
            boxShadow: '0 4px 24px rgba(40,167,69,0.18)',
          }}
        >
          <div className="text-4xl">🏝️</div>
          <div>
            <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Welcome back, bitress!
            </h2>
            <p className="text-green-100 text-sm mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Your Chopaeng Console is active. {loading ? 'Loading data...' : `${totalIslands} islands registered.`}
            </p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card
            title="Total Islands"
            value={loading ? '—' : totalIslands}
            trend="All registered islands"
            color="#28a745"
            icon={
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <Card
            title="Active Islands"
            value={loading ? '—' : activeIslands}
            trend="Trade, Active, Resource & Event"
            color="#2d9cdb"
            icon={
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <Card
            title="Seasonal Islands"
            value={loading ? '—' : seasonalIslands}
            trend="Islands with seasonal events"
            color="#f4a261"
            icon={
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            }
          />
          <Card
            title="Total Items"
            value={loading ? '—' : totalItems}
            trend="Across all islands"
            color="#9b59b6"
            icon={
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            }
          />
        </div>

        {/* Chart */}
        <div
          className="rounded-2xl p-6 shadow-sm"
          style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}
        >
          <h3
            className="text-lg font-extrabold text-[#2d4d5c] mb-1"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Island Visits Over Time
          </h3>
          <p className="text-xs text-[#8a7f6e] mb-5 font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Last 7 days
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#e8e0c8" strokeDasharray="4 4" />
              <XAxis
                dataKey="day"
                tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fill: '#8a7f6e', fontWeight: 700 }}
                axisLine={{ stroke: '#e8e0c8' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fill: '#8a7f6e', fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#fffdf0',
                  border: '1.5px solid #e8e0c8',
                  borderRadius: 12,
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 13,
                }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#28a745"
                strokeWidth={3}
                dot={{ fill: '#28a745', r: 5, strokeWidth: 0 }}
                activeDot={{ r: 7, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent islands quick list */}
        <div
          className="rounded-2xl p-6 shadow-sm"
          style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}
        >
          <h3
            className="text-lg font-extrabold text-[#2d4d5c] mb-4"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Recent Islands
          </h3>
          {loading ? (
            <div className="text-[#8a7f6e] text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>Loading...</div>
          ) : (
            <div className="space-y-2">
              {islands.slice(0, 5).map((island) => (
                <div
                  key={island.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#f5f2e8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🏝️</span>
                    <div>
                      <p className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {island.name}
                      </p>
                      <p className="text-xs text-[#8a7f6e]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {island.id} · {island.cat}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: island.type === 'Trade' ? '#e8f5e9' : island.type === 'Active' ? '#e3f2fd' : '#fce4ec',
                      color: island.type === 'Trade' ? '#28a745' : island.type === 'Active' ? '#2d9cdb' : '#e91e63',
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {island.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
