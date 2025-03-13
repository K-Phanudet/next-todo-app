import React, { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {}

export const Text: React.FC<TextProps> = ({ ...rest }) => {
  return <span {...rest}>{rest.children}</span>;
};