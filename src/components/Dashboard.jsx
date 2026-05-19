import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import StatsCards from './StatsCards';

const DashboardContainer = () => {
  // Pure Frontend Tab/View Navigation State
  const [currentView, setView] = useState('dashboard');
  
  // Local state to display active logged-in session profile metadata
  const [activeUser, setActiveUser] = useState({ name: 'User', role: 'Staff' });

  // Read operator context immediately on component mount
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

  return (
    <div className="flex bg-slate-50 min-h-screen w-full font-sans antialiased text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* 1. APP SIDEBAR LAYOUT FRAME */}
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        onLogout={() => console.log('Session termination sequence triggered.')} 
      />

      {/* Main Document Scroll Wrapper */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        
        {/* Dynamic Global Workspace Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 transition-all duration-300">
          
          {/* ========================================================================= */}
          {/* VIEWPORT PANEL 1: MAIN DASHBOARD                                          */}
          {/* ========================================================================= */}
          {currentView === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto animate-[fadeIn_0.2s_ease-out]">
              
              {/* Header Banner Sub-layout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight capitalize">
                    Control Dashboard
                  </h1>
                  <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mt-1">
                    System Node Online • Operator:{' '}
                    <span className="text-blue-600 font-extrabold">{activeUser.name}</span>{' '}
                    <span className="text-slate-300 font-normal">|</span> Security Context:{' '}
                    <span className="text-slate-600 font-extrabold">{activeUser.role}</span>
                  </p>
                </div>
                
                {/* Visual Telemetry Beacon */}
                <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold w-fit shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="tracking-wide">Terminal Sync Active</span>
                </div>
              </div>

              {/* 2. LIVE TELEMETRY COUNTER WIDGET SHELL */}
              <StatsCards />

              {/* 3. PATIENT QUEUE REGISTRY LAYOUT CANVASES */}
              <div className="bg-white rounded-[2rem] p-5 sm:p-8 shadow-sm border border-slate-200/60 overflow-hidden transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">Active Queue Registry</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Real-time clinical triage queue tracking workspace</p>
                  </div>
                  
                  {/* Action Filters Bar Wrapper */}
                  <div className="flex items-center gap-2">
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors">
                      Export CSV
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs shadow-blue-100">
                      + Add Record
                    </button>
                  </div>
                </div>

                {/* Data Grid Table Presenter Component */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 text-slate-400 text-[10px] font-black uppercase border-b border-slate-200/80 tracking-wider">
                        <th className="p-4 font-bold">Patient Entity</th>
                        <th className="p-4 font-bold">Timeline Target</th>
                        <th className="p-4 font-bold">Allocation Unit</th>
                        <th className="p-4 text-right font-bold">Interactions Hub</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {/* UI Blueprint Row Mock 1 */}
                      <tr className="hover:bg-slate-50/40 transition-colors group">
                        <td className="p-4 font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          Patient Reference Record #01
                        </td>
                        <td className="p-4 text-slate-400 text-xs font-medium tracking-wide">
                          10:30 AM <span className="text-[10px] text-slate-300 font-normal ml-1">(Scheduled)</span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/60 tracking-wider uppercase">
                            Triage Active
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button className="text-xs bg-slate-50 hover:bg-slate-200 border border-slate-200 text-slate-600 font-bold py-1.5 px-3.5 rounded-xl transition-all">
                            Modify Node
                          </button>
                          <button className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-1.5 px-3.5 rounded-xl transition-all">
                            Drop
                          </button>
                        </td>
                      </tr>
                      {/* UI Blueprint Row Mock 2 */}
                      <tr className="hover:bg-slate-50/40 transition-colors group">
                        <td className="p-4 font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          Patient Reference Record #02
                        </td>
                        <td className="p-4 text-slate-400 text-xs font-medium tracking-wide">
                          11:15 AM <span className="text-[10px] text-slate-300 font-normal ml-1">(Walk-in)</span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100/60 tracking-wider uppercase">
                            Pending Assignment
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button className="text-xs bg-slate-50 hover:bg-slate-200 border border-slate-200 text-slate-600 font-bold py-1.5 px-3.5 rounded-xl transition-all">
                            Modify Node
                          </button>
                          <button className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-1.5 px-3.5 rounded-xl transition-all">
                            Drop
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEWPORT PANEL 2: RECORDS MODULE                                         */}
          {/* ========================================================================= */}
          {currentView === 'patients' && (
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200/60 shadow-sm space-y-6 animate-[fadeIn_0.2s_ease-out]">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Patient Clinical Records</h1>
                <p className="text-xs text-slate-400 mt-0.5">Historical clinical charts, telemetry histories, and analytics logging nodes</p>
              </div>
              
              {/* Feature Presentation Shell Box */}
              <div className="border-2 border-dashed border-slate-200 bg-slate-50/40 rounded-2xl h-80 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl font-bold flex items-center justify-center text-xl mb-3 shadow-xs">📋</div>
                <span className="text-slate-700 font-bold text-sm">Winnie's Feature Workspace</span>
                <p className="text-xs text-slate-400 max-w-xs mt-1">Mount Redux slice telemetry loops, diagnostic metric forms, and charts layout components inside this context container.</p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEWPORT PANEL 3: BOOKINGS ENGINE                                         */}
          {/* ========================================================================= */}
          {currentView === 'bookings' && (
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200/60 shadow-sm space-y-6 animate-[fadeIn_0.2s_ease-out]">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Bookings & Schedules</h1>
                <p className="text-xs text-slate-400 mt-0.5">Medical resource allocations, shift rotations, and slots orchestration canvas</p>
              </div>
              
              {/* Feature Presentation Shell Box */}
              <div className="border-2 border-dashed border-slate-200 bg-slate-50/40 rounded-2xl h-80 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl font-bold flex items-center justify-center text-xl mb-3 shadow-xs">📅</div>
                <span className="text-slate-700 font-bold text-sm">Edwin & Sydney's Feature Integration Hub</span>
                <p className="text-xs text-slate-400 max-w-xs mt-1">Bind CRUD operation parameters, calendar slot grids, and async schedule injectors directly into this frame.</p>
              </div>
            </div>
          )}

           
          {currentView === 'services' && (
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200/60 shadow-sm space-y-6 animate-[fadeIn_0.2s_ease-out]">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Healthcare Facilities & Directories</h1>
                <p className="text-xs text-slate-400 mt-0.5">External query network mapping for national clinics and care configurations catalog</p>
              </div>
              
              {/* Feature Presentation Shell Box */}
              <div className="border-2 border-dashed border-slate-200 bg-slate-50/40 rounded-2xl h-80 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl font-bold flex items-center justify-center text-xl mb-3 shadow-xs">🏥</div>
                <span className="text-slate-700 font-bold text-sm">Osman's Directory Query Engine</span>
                <p className="text-xs text-slate-400 max-w-xs mt-1">Hook public API thunks, geospatial query inputs, and regional care center tracking output grids inside this layer.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;