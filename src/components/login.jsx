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