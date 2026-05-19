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
