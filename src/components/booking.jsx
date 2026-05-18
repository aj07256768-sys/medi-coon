import React, { useState } from 'react';

const BookingForm = () => {
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    department: 'General Consultation',
    date: '',
  });

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      ...formData,
    };

    setAppointments([...appointments, newAppointment]);

    alert('Booking Confirmed Successfully!');

    // Reset form
    setFormData({
      name: '',
      department: 'General Consultation',
      date: '',
    });
  };

  // Update Appointment Date
  const updateAppointmentDate = (id, newDate) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, date: newDate }
        : appointment
    );

    setAppointments(updatedAppointments);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* Booking Form */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm animate-in slide-in-from-bottom duration-500">

        <div className="mb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">
            New Appointment
          </h3>

          <p className="text-slate-400 font-medium text-xs mt-1 italic underline decoration-blue-200 underline-offset-4">
            Secure Booking Engine v2.0
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Patient Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                Patient Full Name
              </label>

              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 transition-all font-bold text-sm"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                Medical Department
              </label>

              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 transition-all font-bold text-sm appearance-none"
              >
                <option>General Consultation</option>
                <option>Cardiology Unit</option>
                <option>Dental Surgery</option>
                <option>Emergency Diagnostics</option>
                <option>Psychiatric Clinic</option>
              </select>
            </div>

          </div>

          {/* Appointment Date */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
              Appointment Date
            </label>

            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 transition-all font-bold text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all tracking-widest text-xs uppercase"
          >
            Confirm Schedule Request
          </button>

        </form>
      </div>

      {/* Appointment List */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">

        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-6">
          Scheduled Appointments
        </h3>

        {appointments.length === 0 ? (
          <p className="text-slate-400 font-medium">
            No appointments booked yet.
          </p>
        ) : (
          <div className="space-y-4">

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <h4 className="font-black text-slate-800 text-lg">
                      {appointment.name}
                    </h4>

                    <p className="text-slate-500 text-sm font-medium">
                      {appointment.department}
                    </p>
                  </div>

                  {/* Editable Date */}
                  <div className="flex items-center gap-3">

                    <input
                      type="date"
                      value={appointment.date}
                      onChange={(e) =>
                        updateAppointmentDate(
                          appointment.id,
                          e.target.value
                        )
                      }
                      className="p-3 rounded-xl border border-slate-200 bg-white text-sm font-bold"
                    />

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default BookingForm;
