import React from 'react';

const AppointmentTable = () => {
  const data = [
    { id: 1, name: "John Doe", time: "09:00 AM", status: "Active" },
    { id: 2, name: "Sarah Smith", time: "10:30 AM", status: "Waiting" },
    { id: 3, name: "Mike Ross", time: "01:00 PM", status: "Active" },
  ];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <tr><th className="px-8 py-5">Patient</th><th className="px-8 py-5">Time</th><th className="px-8 py-5 text-right">Status</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-all">
              <td className="px-8 py-6 font-black text-slate-800">{row.name}</td>
              <td className="px-8 py-6 text-sm text-slate-500 italic">{row.time}</td>
              <td className="px-8 py-6 text-right"><span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{row.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
