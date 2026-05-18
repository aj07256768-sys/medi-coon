  import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import StatsCards from './StatsCards';
import { usePatients } from '../../hooks/usePatients';

const DashboardContainer = () => {
  // Internal view management
  const [currentView, setView] = useState('dashboard');
  
  // Local states to grab the live logged-in operator credentials
  const [activeUser, setActiveUser] = useState({ name: 'User', role: 'Staff' });

  // Read login parameters immediately when layout paints to screen
  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    const storedRole = localStorage.getItem('user_role');
    
    if (storedName || storedRole) {
      setActiveUser({
        name: storedName || 'Unknown Operator',
        role: storedRole || 'Staff'
      });
    }
  }, []);
  
  // Custom hook bringing in backend interactive functions
  const { patients, loading, error, changeStatus, cancelAppointment } = usePatients();

  // Dynamic calculations for Stats boxes
  const totalPatients = patients.length;
  const queueCount = patients.filter(p => p.status === 'Waiting').length;

  return (
    <div className="flex bg-slate-50 min-h-screen w-full">
      {/* 1. SIDEBAR: Controls views using internal state hooks */}
      <Sidebar currentView={currentView} setView={setView} onLogout={() => console.log('Logout')} />

      {/* Main content display panels */}
      <div className="flex-1 p-10">
        
        {/* CONDITIONAL VIEW 1: MAIN DASHBOARD */}
        {currentView === 'dashboard' && (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-black text-slate-800 italic capitalize">{currentView}</h1>
              {/* UPDATED: Displays real name and matching security access role */}
              <p className="text-xs font-bold text-slate-400 tracking-wider">
                SYSTEM READY • OPERATOR: <span className="text-blue-600 uppercase">{activeUser.name}</span> ({activeUser.role.toUpperCase()})
              </p>
            </div>

            {loading && <p className="text-blue-500 font-bold">Loading dashboard data...</p>}
            {error && <p className="text-red-500 font-bold">Error loading database: {error}</p>}

            {!loading && !error && (
              <>
                {/* 2. STATS CARDS: Receives live numbers dynamically */}
                <StatsCards totalPatients={totalPatients} queueCount={queueCount} />

                {/* 3. INTERACTIVE PATIENT LIST TABLE */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mt-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] font-black uppercase border-b border-slate-100">
                        <th className="pb-4">Patient</th>
                        <th className="pb-4">Time</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                          <td className="py-4 font-bold text-slate-800">{patient.name}</td>
                          <td className="py-4 text-slate-400 text-sm italic">{patient.time || 'N/A'}</td>
                          <td className="py-4">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                              patient.status === 'Active' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                              {patient.status || 'UNKNOWN'}
                            </span>
                          </td>
                          {/* FULL INTERACTIVITY BUTTONS */}
                          <td className="py-4 text-right space-x-2">
                            <button 
                              onClick={() => changeStatus(patient.id, patient.status)}
                              className="text-xs bg-slate-100 hover:bg-slate-200 font-bold py-1 px-3 rounded-xl text-slate-600 transition"
                            >
                              Toggle Status
                            </button>
                            <button 
                              onClick={() => cancelAppointment(patient.id)}
                              className="text-xs bg-red-50 hover:bg-red-100 font-bold py-1 px-3 rounded-xl text-red-600 transition"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {patients.length === 0 && (
                    <p className="text-slate-400 text-sm italic py-4 text-center">No active patients inside queue registry.</p>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* CONDITIONAL VIEW 2: RECORDS */}
        {currentView === 'patients' && (
          <div>
            <h1 className="text-3xl font-black text-slate-800 italic mb-4">Patient Records</h1>
          </div>
        )}

        {/* CONDITIONAL VIEW 3: BOOKINGS */}
        {currentView === 'bookings' && (
          <div>
            <h1 className="text-3xl font-black text-slate-800 italic mb-4">Bookings Management</h1>
          </div>
        )}

        {/* CONDITIONAL VIEW 4: SERVICES */}
        {currentView === 'services' && (
          <div>
            <h1 className="text-3xl font-black text-slate-800 italic mb-4">Available Services</h1>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardContainer;