import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('doctor');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Static mockup list of user credentials
  const [mockUsers, setMockUsers] = useState([
    { name: "Dr. Evans", email: "doctor@test.com", password: "password123", role: "doctor" },
    { name: "Jane Doe", email: "patient@test.com", password: "password123", role: "patient" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSigningUp) {
      if (mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError('Email already registered!');
        return;
      }
      const newUser = { name, email, password, role };
      setMockUsers([...mockUsers, newUser]);
      alert('Registration successful!');
      onLoginSuccess(role, name);
    } else {
      const matchedUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role
      );

      if (matchedUser) {
        onLoginSuccess(matchedUser.role, matchedUser.name);
      } else {
        setError('Invalid login credentials or role!');
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans bg-white">
      <div className="md:w-3/5 bg-gradient-to-br from-blue-900 to-blue-700 p-12 flex flex-col justify-between text-white">
        <div>
          <div className="text-2xl font-black mb-20 italic">MEDICONNECT</div>
          <h1 className="text-6xl font-black leading-tight">Healthcare<br/><span className="text-blue-400">Standalone.</span></h1>
        </div>
        <div className="flex gap-10 text-[10px] font-black opacity-40 uppercase tracking-widest"><span>LOCAL DEV MODE</span></div>
      </div>

      <div className="w-full md:w-2/5 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-black text-slate-800 mb-6">{isSigningUp ? 'Join Portal' : 'Login'}</h2>
          {error && <div className="p-4 bg-red-50 text-red-700 text-xs font-black rounded-xl mb-4">⚠️ {error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* FIXED: Backticks added inside curly braces to fix syntax compiler error */}
              <button 
                type="button" 
                onClick={() => setRole('doctor')} 
                className={`p-4 rounded-3xl border-2 font-black text-[10px] uppercase transition-all ${role === 'doctor' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-400'}`}
              >
                👨‍⚕️ Staff Portal
              </button>
              
              <button 
                type="button" 
                onClick={() => setRole('patient')} 
                className={`p-4 rounded-3xl border-2 font-black text-[10px] uppercase transition-all ${role === 'patient' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-400'}`}
              >
                🤒 Patient Hub
              </button>
            </div>

            <div className="space-y-3">
              {isSigningUp && <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-2xl bg-slate-50 border text-sm font-bold outline-none focus:border-blue-600" />}
              <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-2xl bg-slate-50 border text-sm font-bold outline-none focus:border-blue-600" />
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-2xl bg-slate-50 border text-sm font-bold outline-none focus:border-blue-600" />
            </div>

            <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">{isSigningUp ? 'Register Account' : 'Initialize Portal'}</button>
          </form>
          <button type="button" onClick={() => { setIsSigningUp(!isSigningUp); setError(''); }} className="mt-8 text-blue-600 font-black text-xs uppercase w-full text-center hover:underline">{isSigningUp ? 'Back to Login' : 'Create Local Profile'}</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;