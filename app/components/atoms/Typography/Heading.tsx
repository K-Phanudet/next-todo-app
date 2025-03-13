import React, { HTMLAttributes, ReactNode } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return <h6 {...rest}>{children}</h6>;
};
