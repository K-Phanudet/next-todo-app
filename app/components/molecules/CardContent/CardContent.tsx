import React from 'react';
import { Heading, Paragraph } from '@/app/components';

export interface CardContentProps {
    title: string;
    description: string;
    titleClassName?: string;
    descriptionClassName?: string;
    containerClassName?: string;
    dataTestId?: string
}

export const CardContent: React.FC<CardContentProps> = ({ title, description, titleClassName = "", descriptionClassName = "", containerClassName = "", dataTestId }) => {
    return (
        <div className={`p-4 ${containerClassName}`} data-testid={dataTestId}>
            <Heading className={`mb-2 text-slate-800 text-xl font-semibold ${titleClassName}`}>{title}</Heading>
            <Paragraph className={`text-slate-600 leading-normal font-light ${descriptionClassName}`}>{description}</Paragraph>
        </div>
    );
};