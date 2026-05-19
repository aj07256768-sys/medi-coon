import React from 'react';

const PatientRecords = () => {
  const patients = [
    { name: 'Alice Wanjiku', blood: 'O+', last: '12 May 2026', id: 'MC-102' },
    { name: 'David Akoth', blood: 'A-', last: '10 May 2026', id: 'MC-405' },
    { name: 'Sarah Njeri', blood: 'B+', last: '01 May 2026', id: 'MC-092' }
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-8 px-2">
        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Medical Archive</h3>
        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">TOTAL: 1,402</span>
      </div>
      <div className="space-y-4">
        {patients.map(p => (
          <div key={p.id} className="flex flex-col md:flex-row justify-between items-center p-6 border rounded-3xl hover:bg-slate-50 transition-all cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">📄</div>
              <div>
                <p className="font-black text-slate-800">{p.name}</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Internal ID: {p.id}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black text-slate-500 uppercase">Blood: {p.blood}</div>
              <div className="px-4 py-2 bg-blue-50 rounded-xl text-[9px] font-black text-blue-600 uppercase">Last Visit: {p.last}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


















export default PatientRecords;