import React from 'react';
import { CardImage, CardImageProps, CardContent, CardContentProps, CardActions, CardActionsProps } from '@/app/components';

interface CardProps {
    imageProps?: CardImageProps;
    contentProps: CardContentProps;
    actionsProps: CardActionsProps;
    className?: string;
    dataTestId?: string
}

export const Card: React.FC<CardProps> = ({ imageProps, contentProps, actionsProps, className = "", dataTestId }) => {
    return (
        <div data-testid={dataTestId} className={`relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 ${className}`}>
            {imageProps && <CardImage {...imageProps} />}
            <CardContent {...contentProps} />
            <CardActions {...actionsProps} />
        </div>
    );
};