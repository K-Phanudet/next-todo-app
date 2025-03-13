import React, { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const CustomLink: React.FC<LinkProps> = ({ href, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      {rest.children}
    </Link>
  );
};