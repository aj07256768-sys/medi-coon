import React, { useState, useEffect } from 'react';

import LoginForm from './components/login';
import Sidebar from './components/sidebar';
import StatsCards from './components/statscard';
import AppointmentTable from './components/Appointment';
import PharmacyStock from './components/pharmacy';
import PatientRecords from './components/Records';
import BookingForm from './components/booking';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('doctor'); // 'doctor' or 'patient'
  const [view, setView] = useState('dashboard');
  const [userName, setUserName] = useState('');

  // Sync state with localStorage on mount in case of page refreshes
  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedRole = localStorage.getItem('user_role');
    
    if (savedName && savedRole) {
      setUserName(savedName);
      setRole(savedRole);
      setIsLoggedIn(true);
      setView(savedRole === 'doctor' ? 'dashboard' : 'bookings');
    }
  }, []);

  // Handle successful login or registration
  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
    
    const savedName = localStorage.getItem('user_name') || 'User';
    setUserName(savedName);

    // Smart routing based on user type
    if (userRole === 'doctor') {
      setView('dashboard'); // Doctors land on the operational analytical screen
    } else {
      setView('bookings');  // Patients land straight on the scheduling form
    }
  };

  // Safe logout handler clearing persistent browser state
  const handleLogout = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    setIsLoggedIn(false);
    setUserName('');
  };

  // Guard Clause: Force Authentication wrapper first
  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar gets the userRole prop to filter out protected menu links */}
      <Sidebar currentView={view} setView={setView} userRole={role} onLogout={handleLogout} />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* Dynamic Context Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-800 capitalize tracking-tighter italic underline decoration-blue-500 underline-offset-8">
              {view}
            </h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-4 opacity-60">
              System Active • Operator: {userName} <span className="text-blue-600">({role})</span>
            </p>
          </div>
          <div className="bg-white px-5 py-2 rounded-xl border border-slate-200 text-[10px] font-black text-blue-600 uppercase tracking-wider shadow-sm">
             MediConnect Secure Portal
          </div>
        </header>

        {/* View Router Section */}
        <div className="transition-all duration-300">
          
          {/* === CLINICAL INSIGHTS DASHBOARD (Staff Only) === */}
          {view === 'dashboard' && role === 'doctor' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <StatsCards />
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-2 overflow-hidden">
                <AppointmentTable />
              </div>
            </div>
          )}

          {/* === CLIENT PORTAL FALLBACK (Patient View of Dashboard) === */}
          {view === 'dashboard' && role === 'patient' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm animate-in fade-in duration-500">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Welcome back, {userName}!</h3>
              <p className="text-sm mt-2 text-slate-500 max-w-xl leading-relaxed">
                Your patient hub is active. Use the side navigation panel to visit the <strong>Bookings</strong> interface where you can request clinical care slots and view outstanding records.
              </p>
            </div>
          )}

          {/* === PROTECTED PATIENT RECORDS SYSTEM (Staff Only) === */}
          {view === 'patients' && (
            role === 'doctor' ? (
              <PatientRecords />
            ) : (
              <div className="bg-red-50 text-red-700 p-6 rounded-2xl font-bold border border-red-100">
                🛑 Access Denied: Patient profiles can only be requested by audited staff credentials.
              </div>
            )
          )}

          {/* === APPOINTMENT SCHEDULING FORM (Shared / Role Adaptive) === */}
          {view === 'bookings' && (
            <BookingForm onComplete={() => setView(role === 'doctor' ? 'dashboard' : 'bookings')} />
          )}

          {/* === ANCILLARY SERVICES & PHARMACY APPS === */}
          {view === 'services' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
               <PharmacyStock />
               <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex justify-between items-center shadow-lg">
                  <div>
                    <h4 className="text-2xl font-black tracking-tighter">Emergency Response Unit</h4>
                    <p className="text-blue-200 text-sm italic font-medium mt-1">Ready for immediate trauma deployment.</p>
                  </div>
                  <div className="text-5xl animate-bounce">🚑</div>
               </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}