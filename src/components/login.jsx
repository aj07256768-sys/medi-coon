 import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('doctor'); // 'doctor' or 'patient'
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSigningUp) {
        // === REGISTER / SIGN UP LOGIC ===
        const checkRes = await fetch('http://localhost:8000/users');
        const allUsers = await checkRes.json();
        
        // Ensure email isn't duplicated locally
        const existingUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
          setError('Email already registered!');
          return;
        }

        // Post new entry to json-server database file
        const newUser = { name, email, password, role };
        const response = await fetch('http://localhost:8000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });

        if (response.ok) {
          const savedUser = await response.json();
          // Write credentials to browser memory for cross-component access
          localStorage.setItem('user_name', savedUser.name);
          localStorage.setItem('user_role', savedUser.role);
          
          alert('Registration successful!');
          onLoginSuccess(savedUser.role); // Fires routing handler in App.jsx
        }

      } else {
        // === LOGIN LOGIC (Version-agnostic Array Processing) ===
        const response = await fetch('http://localhost:8000/users');
        const allUsers = await response.json();

        // Query the data records directly within JavaScript
        const matchedUser = allUsers.find(
          (u) => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password && 
            u.role === role
        );

        if (matchedUser) {
          localStorage.setItem('user_name', matchedUser.name);
          localStorage.setItem('user_role', matchedUser.role);
          
          onLoginSuccess(matchedUser.role);
        } else {
          setError('Invalid email, password, or role selection!');
        }
      }
    } catch (err) {
      setError('Database connection failed. Is json-server running on port 8000?');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      {/* Visual Identity Left Banner */}
      <div className="md:w-3/5 bg-gradient-to-br from-blue-900 to-blue-700 p-12 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-2xl font-black mb-20 italic tracking-wider">MEDICONNECT</div>
          <h1 className="text-6xl font-black leading-tight mb-6">Healthcare<br/><span className="text-blue-400">Intelligent.</span></h1>
        </div>
        <div className="relative z-10 pt-10 border-t border-white/10 flex gap-10 text-[10px] font-black uppercase opacity-40 tracking-widest">
          <span>AES-256 SECURE</span><span>HIPAA COMPLIANT</span>
        </div>
      </div>

      {/* Input Authentication Card */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
            {isSigningUp ? 'Join Portal' : 'Login'}
          </h2>
          
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
            {isSigningUp ? 'Create authorization credentials' : 'Enter security environment'}
          </p>

          {/* Conditional Error Feedback Box */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-100 text-xs font-black rounded-xl uppercase tracking-wider mb-4 animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Split Switcher Matrix */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => setRole('doctor')} 
                className={`p-4 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 ${role === 'doctor' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
              >
                <span className="text-2xl block">👨‍⚕️</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Staff Portal</span>
              </button>
              
              <button 
                type="button" 
                onClick={() => setRole('patient')} 
                className={`p-4 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 ${role === 'patient' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
              >
                <span className="text-2xl block">🤒</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Patient Hub</span>
              </button>
            </div>

            {/* Input fields context validation wrapper */}
            <div className="space-y-3 pt-2">
              {isSigningUp && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm text-slate-800 placeholder:text-slate-400" 
                />
              )}
              
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm text-slate-800 placeholder:text-slate-400" 
              />
              
              <input 
                type="password" 
                placeholder="Password Security Key" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm text-slate-800 placeholder:text-slate-400" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-5 mt-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 active:scale-[0.98] transition-all tracking-widest text-xs uppercase"
            >
              {isSigningUp ? 'Register Account' : 'Initialize Portal'}
            </button>
          </form>

          {/* Toggle Flow Mode Action Button */}
          <button 
            type="button"
            onClick={() => { setIsSigningUp(!isSigningUp); setError(''); }} 
            className="mt-8 text-blue-600 font-black text-xs uppercase w-full text-center hover:underline tracking-widest block"
          >
            {isSigningUp ? 'Back to Portal Login' : 'New Member? Create Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
