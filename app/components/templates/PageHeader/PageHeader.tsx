import React from 'react';

interface PageHeaderProps {
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
    secondButtonText?: string;
    onSecondButtonClick?: () => void;
    className?: string;
    titleClassName?: string;
    buttonClassName?: string;
    secondButtonClassName?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    buttonText,
    onButtonClick,
    secondButtonText,
    onSecondButtonClick,
    className = '',
    titleClassName = '',
    buttonClassName = '',
    secondButtonClassName = '',
}) => {
    return (
        <div
            className={`sticky top-0 z-100 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-4 sm:px-6 lg:px-8 shadow-lg ${className}`}
        >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
                <h1 className={`text-2xl font-semibold mb-2 sm:mb-0 ${titleClassName}`}>
                    {title}
                </h1>
                <div className="flex space-x-2">
                    {buttonText && onButtonClick && (
                        <button
                            onClick={onButtonClick}
                            data-testid="primary-header-cta"
                            className={`rounded-md bg-white text-indigo-600 py-2 px-4 font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm ${buttonClassName}`}
                        >
                            {buttonText}
                        </button>
                    )}
                    {secondButtonText && onSecondButtonClick && (
                        <button
                            onClick={onSecondButtonClick}
                            data-testid="secondary-header-cta"
                            className={`rounded-md bg-white text-indigo-600 py-2 px-4 font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm ${secondButtonClassName}`}
                        >
                            {secondButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
