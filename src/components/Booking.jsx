import React, { useState } from 'react';

const BookingForm = ({ appointments, setAppointments, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: 'General Consultation',
    date: ''
  });

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // UPDATE EXISTING APPOINTMENT
    if (editingId) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingId
          ? { ...appointment, ...formData }
          : appointment
      );

      setAppointments(updatedAppointments);
      alert('Appointment Updated Successfully!');
      setEditingId(null);
    } 
    
    // CREATE NEW APPOINTMENT
    else {
      const newAppointment = {
        id: Date.now(),
        ...formData
      };

      setAppointments([...appointments, newAppointment]);
      alert('Booking Saved Centrally!');
    }

    // RESET FORM
    setFormData({
      name: '',
      department: 'General Consultation',
      date: ''
    });

    if (onComplete) onComplete();
  };

  // LOAD APPOINTMENT INTO FORM FOR EDITING
  const handleEdit = (appointment) => {
    setFormData({
      name: appointment.name,
      department: appointment.department,
      date: appointment.date
    });

    setEditingId(appointment.id);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">

      <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-6">
        {editingId ? 'Edit Appointment' : 'New Appointment'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PATIENT NAME */}
          <input
            type="text"
            required
            placeholder="Patient Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm"
          />

          {/* DEPARTMENT */}
          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm"
          >
            <option>General Consultation</option>
            <option>Cardiology Unit</option>
            <option>Dental Surgery</option>
            <option>Psychiatric Unit</option>
          </select>

        </div>

        {/* DATE */}
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          className="w-full p-5 rounded-2xl bg-slate-50 border outline-none font-bold text-sm"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest"
        >
          {editingId ? 'Update Appointment' : 'Confirm Request'}
        </button>

      </form>

      {/* APPOINTMENT LIST */}
      <div className="mt-10 space-y-4">
        <h4 className="text-xl font-black text-slate-700">
          Booked Appointments
        </h4>

        {appointments.length === 0 ? (
          <p className="text-slate-500">No appointments booked yet.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50 p-5 rounded-2xl border"
            >
              <div>
                <p className="font-bold text-slate-800">
                  {appointment.name}
                </p>
                <p className="text-sm text-slate-500">
                  {appointment.department}
                </p>
                <p className="text-sm text-slate-500">
                  {appointment.date}
                </p>
              </div>

              <button
                onClick={() => handleEdit(appointment)}
                className="px-5 py-3 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Change Date
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default BookingForm;
