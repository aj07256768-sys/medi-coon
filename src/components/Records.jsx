import React, { useState } from 'react';

const patients = [
  { name: 'Alice Wanjiku', blood: 'O+', last: '12 May 2026', id: 'MC-102', age: 34, gender: 'F', status: 'Active' },
  { name: 'David Akoth', blood: 'A-', last: '10 May 2026', id: 'MC-405', age: 52, gender: 'M', status: 'Active' },
  { name: 'Sarah Njeri', blood: 'B+', last: '01 May 2026', id: 'MC-092', age: 28, gender: 'F', status: 'Inactive' },
];

const bloodColors = {
  'O+': { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  'A-': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  'B+': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  'AB+': { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
};

const StatusBadge = ({ status }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '3px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    backgroundColor: status === 'Active' ? '#F0FDF4' : '#F9FAFB',
    color: status === 'Active' ? '#16A34A' : '#9CA3AF',
    border: `1px solid ${status === 'Active' ? '#BBF7D0' : '#E5E7EB'}`,
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: '50%',
      backgroundColor: status === 'Active' ? '#22C55E' : '#D1D5DB',
      display: 'inline-block',
    }} />
    {status}
  </span>
);

const Avatar = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 12,
      backgroundColor: color + '18',
      border: `1.5px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color,
      flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {initials}
    </div>
  );
};

const BloodBadge = ({ type }) => {
  const c = bloodColors[type] || { bg: '#F9FAFB', text: '#374151', border: '#E5E7EB' };
  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 8,
      fontSize: 11,
      fontWeight: 700,
      backgroundColor: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      fontFamily: "'DM Mono', monospace",
      letterSpacing: '0.05em',
    }}>
      {type}
    </span>
  );
};

const PatientRow = ({ patient, isLast }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'background 0.15s ease',
        backgroundColor: hovered ? '#F8FAFC' : 'transparent',
        borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
        cursor: 'pointer',
      }}
    >
      <td style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={patient.name} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', fontFamily: "'DM Sans', sans-serif" }}>
              {patient.name}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
              {patient.id}
            </div>
          </div>
        </div>
      </td>
      <td style={{ padding: '14px 12px', fontSize: 13, color: '#475569', fontFamily: "'DM Sans', sans-serif" }}>
        {patient.age}y &middot; {patient.gender === 'F' ? 'Female' : 'Male'}
      </td>
      <td style={{ padding: '14px 12px' }}>
        <BloodBadge type={patient.blood} />
      </td>
      <td style={{ padding: '14px 12px', fontSize: 13, color: '#64748B', fontFamily: "'DM Sans', sans-serif" }}>
        {patient.last}
      </td>
      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
        <StatusBadge status={patient.status} />
      </td>
    </tr>
  );
};

const PatientRecords = () => {
  const [search, setSearch] = useState('');

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #CBD5E1; }
        input:focus { outline: none; border-color: #3B82F6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
      `}</style>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        maxWidth: 780,
        margin: '0 auto',
      }}>

        <div style={{
          padding: '22px 24px 18px',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Patient Records
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94A3B8' }}>
              Medical Archive &middot; 1,402 total patients
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="text"
              placeholder="Search by name or ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '8px 14px',
                fontSize: 13,
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                color: '#1E293B',
                width: 200,
                backgroundColor: '#F8FAFC',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            />
            <button style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: '#1E293B',
              color: '#FFF',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              + Add Patient
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Patient', 'Demographics', 'Blood Type', 'Last Visit', 'Status'].map((h, i) => (
                  <th key={h} style={{
                    padding: '10px ' + (i === 0 ? '20px' : i === 4 ? '20px' : '12px'),
                    textAlign: i === 4 ? 'right' : 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#94A3B8',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0
                ? filtered.map((p, i) => (
                    <PatientRow key={p.id} patient={p} isLast={i === filtered.length - 1} />
                  ))
                : (
                  <tr>
                    <td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', color: '#CBD5E1', fontSize: 13 }}>
                      No patients found.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #F1F5F9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: '#CBD5E1', fontFamily: "'DM Mono', monospace" }}>
            Showing {filtered.length} of {patients.length} records
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['←', '→'].map(arrow => (
              <button key={arrow} style={{
                width: 30, height: 30,
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                backgroundColor: '#FFF',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {arrow}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientRecords;