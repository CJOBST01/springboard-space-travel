import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpacecraftCard from './SpacecraftCard';

const sample = { id: 'abc123', name: 'Voyager', capacity: 5000, description: 'Test ship', currentLocation: 3 };

function renderCard(props = {}) {
  const onDestroy = props.onDestroy || jest.fn();
  return {
    onDestroy,
    ...render(
      <MemoryRouter>
        <SpacecraftCard spacecraft={sample} planetName="Earth" onDestroy={onDestroy} />
      </MemoryRouter>
    ),
  };
}

describe('SpacecraftCard', () => {
  test('renders name, capacity, and planet', () => {
    renderCard();
    expect(screen.getByText('Voyager')).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 5,000/)).toBeInTheDocument();
    expect(screen.getByText(/Location: Earth/)).toBeInTheDocument();
  });

  test('view link points to spacecraft detail route', () => {
    renderCard();
    const link = screen.getByRole('link', { name: /view/i });
    expect(link).toHaveAttribute('href', '/spacecrafts/abc123');
  });

  test('confirms before destroying', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const { onDestroy } = renderCard();
    fireEvent.click(screen.getByRole('button', { name: /decommission/i }));
    expect(confirmSpy).toHaveBeenCalled();
    expect(onDestroy).toHaveBeenCalledWith('abc123');
    confirmSpy.mockRestore();
  });

  test('does not destroy if confirm cancelled', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    const { onDestroy } = renderCard();
    fireEvent.click(screen.getByRole('button', { name: /decommission/i }));
    expect(onDestroy).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });
});
