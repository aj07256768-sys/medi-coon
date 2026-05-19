import React, { useState } from 'react';
const LoginForm = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('doctor');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [name, setName] = useState('');