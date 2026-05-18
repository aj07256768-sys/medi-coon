import React, { useState } from 'react';
import LoginForm from './components/login';
import Sidebar from './components/sidebar';
import StatsCards from './components/statscard';
import AppointmentTable from './components/Appointment';
import PharmacyStock from './components/pharmacy';
import PatientRecords from './components/Records';
import BookingForm from './components/booking';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('doctor'); 
  const [view, setView] = useState('dashboard');
  const [userName, setUserName] = useState('');

  // Local state arrays mimicking the database
  const [appointments, setAppointments] = useState([
    { id: 1, name: "John Doe", department: "General Consultation", date: "2026-05-20" },
    { id: 2, name: "Sarah Smith", department: "Cardiology Unit", date: "2026-05-21" }
  ]);

  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", stock: 450 },
    { id: 2, name: "Amoxicillin", stock: 12 },
    { id: 3, name: "Insulin", stock: 84 },
    { id: 4, name: "Aspirin", stock: 20 }
  ]);

  const handleLoginSuccess = (userRole, name) => {
    setRole(userRole);
    setIsLoggedIn(true);
    setUserName(name || 'User');
    setView(userRole === 'doctor' ? 'dashboard' : 'bookings');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  if (!isLoggedIn) return <LoginForm onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      <Sidebar currentView={view} setView={setView} userRole={role} onLogout={handleLogout} />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-800 capitalize tracking-tighter italic underline decoration-blue-500 underline-offset-8">{view}</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-4 opacity-60">
              Active • Operator: {userName} <span className="text-blue-600">({role})</span>
            </p>
          </div>
          <div className="bg-white px-5 py-2 rounded-xl border border-slate-200 text-[10px] font-black text-blue-600 uppercase tracking-wider shadow-sm">MediConnect Portal</div>
        </header>

        <div className="transition-all duration-300">
          {view === 'dashboard' && role === 'doctor' && (
            <div className="space-y-10">
              <StatsCards appointmentsCount={appointments.length} />
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-2 overflow-hidden">
                <AppointmentTable appointments={appointments} setAppointments={setAppointments} />
              </div>
            </div>
          )}

          {view === 'dashboard' && role === 'patient' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Welcome, {userName}!</h3>
              <p className="text-sm mt-2 text-slate-500 max-w-xl leading-relaxed">Your patient hub is active. Use the sidebar to navigate to the Bookings panel.</p>
            </div>
          )}

          {view === 'patients' && (role === 'doctor' ? <PatientRecords /> : <div className="p-6 bg-red-50 text-red-700 rounded-2xl font-bold">🛑 Access Denied.</div>)}
          
          {view === 'bookings' && (
            <BookingForm appointments={appointments} setAppointments={setAppointments} onComplete={() => setView(role === 'doctor' ? 'dashboard' : 'bookings')} />
          )}
          
          {view === 'services' && role === 'doctor' && (
            <div className="space-y-8">
               <PharmacyStock medicines={medicines} setMedicines={setMedicines} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}