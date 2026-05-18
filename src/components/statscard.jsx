import React from 'react';

const StatsCards = ({ appointmentsCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"> 
    <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl"> 
      <p className="opacity-70 text-[10px] font-black uppercase mb-2">Total Patients</p> 
      <p className="text-4xl font-black tracking-tighter">1,402</p>
    </div>
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
      <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Queue Count</p>
      <p className="text-4xl font-black text-slate-800 tracking-tighter">{appointmentsCount}</p>
    </div>
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 border-l-8 border-l-green-500 shadow-sm">
      <p className="text-slate-400 text-[10px] font-black uppercase mb-2">System Mode</p>
      <p className="text-xl font-bold text-green-600 uppercase">Local state</p>
    </div>
  </div>
);

export default StatsCards;