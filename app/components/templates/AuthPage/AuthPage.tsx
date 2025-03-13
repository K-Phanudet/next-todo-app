import React from 'react';
import { AuthForm } from '@/app/components/'

interface AuthPageProps {
    isLogin?: boolean;
    onSubmit: (e: React.FormEvent) => void;
    usernameRef: React.RefObject<HTMLInputElement | null>;
    passwordRef: React.RefObject<HTMLInputElement | null>;
    errorMessage?: string
}

export const AuthPage: React.FC<AuthPageProps> = ({ isLogin, onSubmit, usernameRef, passwordRef, errorMessage }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50">
            <AuthForm isLogin={isLogin} onSubmit={onSubmit} usernameRef={usernameRef} passwordRef={passwordRef} errorMessage={errorMessage} />
        </div>
    );
};