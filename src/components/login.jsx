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