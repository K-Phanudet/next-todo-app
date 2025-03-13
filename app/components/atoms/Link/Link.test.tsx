import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomLink } from './Link';
import Link from 'next/link';


jest.mock('next/link', () =>  ({ children, href, ...rest }: any) => (
    <a href={href} {...rest} data-testid="next-link" >
      {children}
    </a>
  )
);

describe('CustomLink Component Tests', () => {
  it('should render the link with children and href', () => {
    render(<CustomLink href="/test">Test Link</CustomLink>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
    expect(screen.getByTestId('next-link')).toHaveAttribute('href', '/test');
  });

  it('should spread other props to the next/link component', () => {
    render(<CustomLink href="/test" data-testid="custom-link" className="test-class">Test Link</CustomLink>);
    const link = screen.getByTestId('next-link');
    expect(link).toHaveClass('test-class');
  });

  it('should render with correct default attributes', () => {
    render(<CustomLink href="/test">Test Link</CustomLink>);
    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '/test');
  });
});