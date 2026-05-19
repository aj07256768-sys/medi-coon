import React from 'react';
import StatsCards from './StatsCards';
import AppointmentTable from './Appointment';

export default function DashboardContainer({ currentView, appointments, setAppointments, stats }) {
  // If the active view isn't the main dashboard panel, don't display this component
  if (currentView !== 'dashboard') return null;

  return (
    <div className="space-y-10 animate-[fadeIn_0.2s_ease-out]">
      {/* 1. Live Telemetry Counter Cards */}
      <StatsCards 
        totalPatients={stats.totalPatients} 
        queueCount={appointments.length || stats.queueCount} 
        systemMode={stats.systemMode} 
      />

      {/* 2. Live Patient Registry Data Grid Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Active Queue Registry</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time clinical triage queue tracking workspace</p>
        </div>
        
        <AppointmentTable appointments={appointments} setAppointments={setAppointments} />
      </div>
    </div>
  );
}