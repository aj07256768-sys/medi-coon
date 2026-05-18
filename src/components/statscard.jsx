import React from 'react';
//Defines a functional component.
const StatsCards = () => (
  //Creates a responsive grid layout with three cards, each displaying different statistics.
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"> 
    <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100"> 
      <p className="opacity-70 text-[10px] font-black uppercase mb-2">Patients</p> 
      <p className="text-4xl font-black tracking-tighter">1,402</p>
    </div>
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
      <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Queue</p>
      <p className="text-4xl font-black text-slate-800 tracking-tighter">18</p>
    </div>
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm border-l-8 border-l-green-500">
      <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Status</p>
      <p className="text-xl font-bold text-green-600 uppercase tracking-tighter">Secure</p>
    </div>
  </div>
);

export default StatsCards;
