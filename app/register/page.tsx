"use client";

import React, { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { register } from '../lib/api/user';
import { AuthPage } from "@/app/components"

export default function RegisterPage() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState(undefined)

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(undefined);

    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      await register({ username, password });
      router.push('/login');

    } catch (err: any) {
      console.error('Registration error:', err);
      setErrorMessage(err.message)
    }
  };
  return <AuthPage usernameRef={usernameRef} passwordRef={passwordRef} onSubmit={handleSubmit} errorMessage={errorMessage} />;

}