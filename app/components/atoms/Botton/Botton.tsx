import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return <button className={`cursor-pointer ${className}`} {...rest}>{children}</button>;
};