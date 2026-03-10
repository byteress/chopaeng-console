import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/islands',
    label: 'Islands',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/logs',
    label: 'Flight Logger',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 flex flex-col z-30"
      style={{
        background: '#fffdf0',
        backgroundImage: 'radial-gradient(#e8e4d0 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        borderRight: '1.5px solid #e8e0c8',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-7 pb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0"
          style={{ background: '#28a745', fontFamily: "'Fredoka One', cursive" }}
        >
          C
        </div>
        <div>
          <div
            className="text-[#2d4d5c] leading-tight text-lg"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Chopaeng
          </div>
          <div className="text-xs text-[#8a7f6e] font-semibold tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Admin Console
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-4 h-px bg-[#e8e0c8]" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-widest text-[#b0a898] uppercase" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Navigation
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#28a745] text-white shadow-md'
                  : 'text-[#5e564d] hover:bg-[#f0ede0] hover:text-[#2d4d5c]'
              }`
            }
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-white' : 'text-[#8a7f6e]'}>{item.icon}</span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom divider */}
      <div className="mx-5 mt-4 h-px bg-[#e8e0c8]" />

      {/* User section */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: '#4a9d6f', fontFamily: "'Nunito', sans-serif" }}
        >
          B
        </div>
        <div>
          <div className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            bitress
          </div>
          <div className="text-xs text-[#8a7f6e]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Administrator
          </div>
        </div>
        <div className="ml-auto">
          <div className="w-2 h-2 rounded-full bg-[#28a745]" title="Online" />
        </div>
      </div>
    </aside>
  );
}
