import React, { ReactNode, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
    children: ReactNode;
}
export const Icon: React.FC<IconProps> = ({ children, ...rest }) => {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...rest}>
            {children}
        </svg>
    );
};