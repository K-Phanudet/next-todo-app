import React, { ButtonHTMLAttributes } from 'react';
import { Button } from '@/app/components';


interface ButtonConfig {
    buttonText: string;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> & { 'data-testid'?: string };
}

export interface CardActionsProps {
    buttons?: ButtonConfig[];
    containerClassName?: string;
    dataTestId?: string
}

export const CardActions: React.FC<CardActionsProps> = ({ buttons = [], containerClassName = "", dataTestId }) => {
    return (
        <div className={`px-4 pb-4 pt-0 mt-2 flex justify-between ${containerClassName}`} data-testid={dataTestId}>
            {buttons.map((buttonConfig, index) => (
                <Button
                    key={index}
                    className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    {...buttonConfig.buttonProps}
                    type="button"
                >
                    {buttonConfig.buttonText}
                </Button>
            ))}
        </div>
    );
};