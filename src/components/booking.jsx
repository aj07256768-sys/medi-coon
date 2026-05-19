import React, { useState } from 'react';

const BookingForm = ({ appointments, setAppointments, onComplete }) => {

  const [formData, setFormData] = useState({ name: '', department: 'General Consultation', date: '' });

  // Handle new booking submission
  
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

  // Handle deletion of a booking
  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
    alert('Booking Deleted!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
      <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-6">New Appointment</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            required
            placeholder="Patient Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm"
          />
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm"
          >
            <option>General Consultation</option>
            <option>Cardiology Unit</option>
            <option>Dental Surgery</option>
          </select>
        </div>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm"
        />
        <button
          type="submit"
          className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest"
        >
          Confirm Request
        </button>
      </form>

      {/* Display existing bookings with delete option */}
      {appointments.length > 0 && (
        <div className="mt-10">
          <h4 className="text-2xl font-bold mb-4">Existing Bookings</h4>
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="flex justify-between items-center bg-slate-100 p-4 rounded-xl">
                <div>
                  <p><strong>Name:</strong> {appointment.name}</p>
                  <p><strong>Department:</strong> {appointment.department}</p>
                  <p><strong>Date:</strong> {appointment.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingForm;