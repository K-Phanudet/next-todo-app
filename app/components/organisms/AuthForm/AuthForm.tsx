import React from 'react';
import { Form, Input, Button, CustomLink } from '@/app/components';


interface AuthFormProps {
    isLogin?: boolean;
    onSubmit: (e: React.FormEvent) => void;
    usernameRef: React.RefObject<HTMLInputElement | null>;
    passwordRef: React.RefObject<HTMLInputElement | null>;
    errorMessage?: string
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false, onSubmit, usernameRef, passwordRef, errorMessage }) => {
    return (
        <Form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" data-testid="auth-form">
            <h2 data-testid="auth-form-title" className="text-2xl font-semibold mb-6">{isLogin ? 'Login' : 'Register'}</h2>
            <Input ref={usernameRef} label="Username" id="username" type="text" data-testid="input-username" required />
            <Input ref={passwordRef} label="Password" id="password" type="password" data-testid="input-password" required />
            {errorMessage && <p className="mt-2 text-sm text-red-600 text-base sm:text-sm md:text-xs ">{errorMessage}</p>}
            <CustomLink data-testid="auth-form-custom-text-btn" href={isLogin ? '/register' : '/login'} className='text-base sm:text-sm md:text-xs text-blue-500'>
                {isLogin ? 'Register' : 'Login'}
            </CustomLink>
            <div className="text-center">
                <Button type="submit"
                data-testid="auth-form-primary-cta"
                    className="mb-4 rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </div>
        </Form>
    );
};
