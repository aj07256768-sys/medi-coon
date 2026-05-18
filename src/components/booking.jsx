import React, { useState } from 'react';

const BookingForm = ({ appointments, setAppointments, onComplete }) => {
  const [formData, setFormData] = useState({ name: '', department: 'General Consultation', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      ...formData
    };
    setAppointments([...appointments, newAppointment]);
    alert('Booking Saved Centrally!');
    setFormData({ name: '', department: 'General Consultation', date: '' });
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
      <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-6">New Appointment</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" required placeholder="Patient Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm" />
          <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm">
            <option>General Consultation</option>
            <option>Cardiology Unit</option>
            <option>Dental Surgery</option>
          </select>
        </div>
        <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm" />
        <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest">Confirm Request</button>
      </form>
    </div>
  );
};

export default BookingForm;