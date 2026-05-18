import React from 'react';
//Accepts props for the current view, a function to set the view, and a logout handler. Renders a sidebar with navigation buttons and a logout button.//
const Sidebar = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard' },//
    { id: 'patients', label: '📂 Records' },
    { id: 'bookings', label: '📑 Bookings' },
    { id: 'services', label: '🏥 Services' }
  ];

  return (
    <aside className="w-full md:w-72 bg-slate-900 text-white p-8 flex flex-col shadow-2xl min-h-screen">
      <div className="text-xl font-black mb-12 italic text-blue-500 tracking-tighter uppercase">MediConnect</div>
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => setView(item.id)} className={`w-full text-left p-4 rounded-2xl font-bold text-sm transition-all ${currentView === item.id ? 'bg-blue-600 text-white shadow-xl' : 'hover:bg-slate-800 text-slate-400'}`}>
            {item.label}
          </button>
        ))}
      </nav>
      <button onClick={onLogout} className="mt-8 bg-slate-800 p-4 rounded-2xl text-[10px] font-black hover:bg-red-600 transition-all uppercase tracking-widest">Logout</button>
    </aside>
  );
};

export default Sidebar;
