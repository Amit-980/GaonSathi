import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  );
});

test('opens register and find sections separately', async () => {
  render(<App />);
  expect(screen.getByText(/GaonSathi/i)).toBeInTheDocument();
  expect(screen.getByText(/Bookstore/i)).toBeInTheDocument();
  expect(screen.getByText(/Electrician/i)).toBeInTheDocument();
  expect(screen.getByText(/Plumber/i)).toBeInTheDocument();
  expect(screen.getByText(/Tractor Booking/i)).toBeInTheDocument();
  expect(screen.queryByText(/Register New/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Already Registered/i)).not.toBeInTheDocument();

  await userEvent.click(screen.getAllByText(/Open/i)[0]);

  expect(screen.getByText(/Register New/i)).toBeInTheDocument();
  expect(screen.getByText(/Find Registered/i)).toBeInTheDocument();
  expect(screen.queryByText(/Already Registered/i)).not.toBeInTheDocument();

  await userEvent.click(screen.getByText(/Find Registered/i));

  expect(screen.getByText(/Already Registered/i)).toBeInTheDocument();
  expect(await screen.findByText(/No registered people found/i)).toBeInTheDocument();
});
