import React, { HTMLAttributes, ReactNode } from 'react';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};