import React from 'react';

const AppointmentTable = ({ appointments, setAppointments }) => {
  const handleDismiss = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden p-4">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <tr><th className="px-8 py-5">Patient</th><th className="px-8 py-5">Department</th><th className="px-8 py-5">Date</th><th className="px-8 py-5 text-right">Action</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {appointments.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-all">
              <td className="px-8 py-6 font-black text-slate-800">{row.name}</td>
              <td className="px-8 py-6 text-sm text-slate-600">{row.department}</td>
              <td className="px-8 py-6 text-sm text-slate-400 italic">{row.date}</td>
              <td className="px-8 py-6 text-right">
                <button onClick={() => handleDismiss(row.id)} className="bg-red-50 text-red-600 font-bold text-xs px-3 py-1 rounded-xl hover:bg-red-100">Dismiss</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {appointments.length === 0 && <p className="text-center py-6 text-slate-400 text-sm">No clinical visits registered.</p>}
    </div>
  );
};

export default AppointmentTable;