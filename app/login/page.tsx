"use client";

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthPage } from "@/app/components"

export default function LoginPage() {
  const { login } = useAuth()
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState(undefined)
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent|React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(undefined);

    try {
      const username = usernameRef.current?.value || '';
      const password = passwordRef.current?.value || '';
      await login({ username, password });

      router.push('/todos');
    } catch (err: any) { 
      console.error('Login error:', err);
      console.log(err)
      setErrorMessage(err.message)
    }
  };

  return <AuthPage isLogin usernameRef={usernameRef} passwordRef={passwordRef} onSubmit={handleSubmit} errorMessage={errorMessage}/>;
  
}