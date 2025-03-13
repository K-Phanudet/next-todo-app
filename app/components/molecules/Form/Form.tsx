import React, { FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> { }

export const Form: React.FC<FormProps> = ({ ...rest }) => {
    return <form {...rest}>{rest.children}</form>;
};