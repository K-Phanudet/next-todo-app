import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PageHeader } from './PageHeader';

describe('PageHeader Component Tests', () => {
  const mockOnButtonClick = jest.fn();
  const mockOnSecondButtonClick = jest.fn();

  it('should render the title', () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render the primary button when buttonText and onButtonClick are provided', () => {
    render(<PageHeader title="Test Title" buttonText="Primary Button" onButtonClick={mockOnButtonClick} />);
    expect(screen.getByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
  });

  it('should render the secondary button when secondButtonText and onSecondButtonClick are provided', () => {
    render(
      <PageHeader
        title="Test Title"
        secondButtonText="Secondary Button"
        onSecondButtonClick={mockOnSecondButtonClick}
      />
    );
    expect(screen.getByRole('button', { name: 'Secondary Button' })).toBeInTheDocument();
  });

  it('should call onButtonClick when the primary button is clicked', () => {
    render(<PageHeader title="Test Title" buttonText="Primary Button" onButtonClick={mockOnButtonClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Primary Button' }));
    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSecondButtonClick when the secondary button is clicked', () => {
    render(
      <PageHeader
        title="Test Title"
        secondButtonText="Secondary Button"
        onSecondButtonClick={mockOnSecondButtonClick}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Secondary Button' }));
    expect(mockOnSecondButtonClick).toHaveBeenCalledTimes(1);
  });
  it('should not render buttons when their props are not provided', () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render correct data-testid', () => {
    render(<PageHeader title="Test Title" buttonText="Primary Button" onButtonClick={mockOnButtonClick} secondButtonText="Secondary Button" onSecondButtonClick={mockOnSecondButtonClick}/>);
    expect(screen.getByTestId('primary-header-cta')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-header-cta')).toBeInTheDocument();
  });

});