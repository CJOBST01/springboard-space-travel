import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => { localStorage.clear(); });

test('renders Navbar with primary links', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  await waitFor(() => {
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
  expect(screen.getByRole('link', { name: /spacecrafts/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /planets/i })).toBeInTheDocument();
});

test('renders home page content at /', async () => {
  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /space travel/i, level: 1 })).toBeInTheDocument();
  });
});

test('redirects unknown routes to home', async () => {
  render(<MemoryRouter initialEntries={['/no-such-route']}><App /></MemoryRouter>);
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /space travel/i, level: 1 })).toBeInTheDocument();
  });
});
