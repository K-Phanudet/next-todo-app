import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardActions } from './CardActions';

describe('CardActions Component Tests', () => {
  it('should render no buttons when buttons prop is empty', () => {
    render(<CardActions dataTestId='test-card-action'/>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render buttons based on the buttons prop', () => {
    const buttons = [
      { buttonText: 'Button 1', buttonProps: { 'data-testid': 'button-1' } },
      { buttonText: 'Button 2', buttonProps: { 'data-testid': 'button-2' } },
    ];
    render(<CardActions  dataTestId='test-card-action' buttons={buttons} />);
    expect(screen.getByTestId('button-1')).toBeInTheDocument();
    expect(screen.getByTestId('button-2')).toBeInTheDocument();
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('should apply the containerClassName prop', () => {
    render(<CardActions dataTestId='test-card-action' containerClassName="test-container-class" />);
    expect(screen.getByTestId('test-card-action')).toHaveClass('test-container-class');
  });

  it('should handle click events on buttons', () => {
    const handleClick1 = jest.fn();
    const handleClick2 = jest.fn();
    const buttons = [
      { buttonText: 'Button 1', buttonProps: { onClick: handleClick1, 'data-testid': 'button-1' } },
      { buttonText: 'Button 2', buttonProps: { onClick: handleClick2, 'data-testid': 'button-2' } },
    ];
    render(<CardActions dataTestId='test-card-action' buttons={buttons} />);

    fireEvent.click(screen.getByTestId('button-1'));
    expect(handleClick1).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('button-2'));
    expect(handleClick2).toHaveBeenCalledTimes(1);
  });
});