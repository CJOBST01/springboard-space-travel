import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Construction from './Construction';

jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({ refresh: jest.fn() }),
}));
jest.mock('../../services/SpaceTravelApi', () => ({
  __esModule: true,
  default: { buildSpacecraft: jest.fn() },
}));

describe('Construction', () => {
  test('shows errors for missing required fields on submit', () => {
    render(<MemoryRouter><Construction /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: /^build$/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/capacity must be a positive number/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });

  test('rejects non-positive capacity', () => {
    render(<MemoryRouter><Construction /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'Pioneer' } });
    fireEvent.change(screen.getByLabelText(/^capacity/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/^description/i), { target: { value: 'Test' } });
    fireEvent.click(screen.getByRole('button', { name: /^build$/i }));
    expect(screen.getByText(/capacity must be a positive number/i)).toBeInTheDocument();
  });
});
