import { useState } from 'react';
import Topbar from '../../components/layout/Topbar';
import Button from '../../components/ui/Button';

interface ToggleProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}

function Toggle({ label, description, defaultChecked = false }: ToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>{label}</p>
        {description && (
          <p className="text-xs text-[#8a7f6e] mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#28a745]/40 ${
          enabled ? 'bg-[#28a745]' : 'bg-[#d4cfc0]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm"
      style={{ background: '#fffdf0', border: '1.5px solid #e8e0c8' }}
    >
      <h3 className="text-base font-extrabold text-[#2d4d5c] mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

const inputClass = `
  w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-[#2d4d5c] outline-none
  focus:ring-2 focus:ring-[#28a745]/40 transition-all
`;
const inputStyle = {
  background: '#f7f4e8',
  border: '1.5px solid #e8e0c8',
  fontFamily: "'Nunito', sans-serif",
};
const labelClass = 'block text-xs font-extrabold text-[#5e564d] uppercase tracking-wider mb-1';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen">
      <Topbar title="Settings" />

      <div className="px-8 py-6 max-w-2xl space-y-5">

        {/* Profile */}
        <Section title="👤 Profile">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-extrabold shadow-md"
                style={{ background: '#28a745', fontFamily: "'Fredoka One', cursive" }}
              >
                B
              </div>
              <div>
                <p className="text-base font-extrabold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>bitress</p>
                <p className="text-xs text-[#8a7f6e]" style={{ fontFamily: "'Nunito', sans-serif" }}>Administrator · Chopaeng Console</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Display Name</label>
                <input defaultValue="bitress" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Email</label>
                <input defaultValue="bitress@chopaeng.gg" type="email" className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>Bio</label>
              <textarea
                defaultValue="Managing the Chopaeng island network 🏝️"
                rows={2}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="primary" onClick={handleSave}>
                {saved ? '✓ Saved!' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </Section>

        {/* Appearance */}
        <Section title="🎨 Appearance">
          <div className="divide-y divide-[#f0ede0]">
            <Toggle label="Compact mode" description="Reduce padding and spacing in tables" />
            <Toggle label="Show island badges" description="Display type badges in island lists" defaultChecked />
            <Toggle label="Animated transitions" description="Enable hover and page transitions" defaultChecked />
            <Toggle label="Dark mode" description="Coming soon — stay tuned 🌙" />
          </div>
        </Section>

        {/* Notifications */}
        <Section title="🔔 Notifications">
          <div className="divide-y divide-[#f0ede0]">
            <Toggle label="Island offline alerts" description="Notify when an island goes offline" defaultChecked />
            <Toggle label="Bot disconnect alerts" description="Notify when a bot disconnects" defaultChecked />
            <Toggle label="Switch temperature warnings" description="Alert on high console temperature" defaultChecked />
            <Toggle label="New visitor notifications" description="Notify on each new island visitor" />
          </div>
        </Section>

        {/* API */}
        <Section title="🔑 API Access">
          <div className="space-y-3">
            <div>
              <label className={labelClass} style={{ fontFamily: "'Nunito', sans-serif" }}>API Key</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value="chp_live_••••••••••••••••••••••••••••••••"
                  className={`${inputClass} flex-1`}
                  style={{ ...inputStyle, letterSpacing: 1 }}
                />
                <Button variant="secondary">Reveal</Button>
                <Button variant="secondary">Rotate</Button>
              </div>
            </div>
            <p className="text-xs text-[#b0a898]" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Last rotated: June 10, 2024 · Keep this key secret.
            </p>
          </div>
        </Section>

        {/* Danger zone */}
        <div
          className="rounded-2xl p-6 shadow-sm"
          style={{ background: '#fff5f5', border: '1.5px solid #fecaca' }}
        >
          <h3 className="text-base font-extrabold text-red-600 mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>
            ⚠️ Danger Zone
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>Clear all island data</p>
                <p className="text-xs text-[#8a7f6e]" style={{ fontFamily: "'Nunito', sans-serif" }}>Removes all registered islands. Cannot be undone.</p>
              </div>
              <Button variant="danger" size="sm">Clear Data</Button>
            </div>
            <div className="h-px bg-red-100" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#2d4d5c]" style={{ fontFamily: "'Nunito', sans-serif" }}>Delete account</p>
                <p className="text-xs text-[#8a7f6e]" style={{ fontFamily: "'Nunito', sans-serif" }}>Permanently delete this admin account.</p>
              </div>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
