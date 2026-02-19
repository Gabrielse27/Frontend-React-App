import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Min Skola Dashboard heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Min Skola Dashboard/i);
  expect(headingElement).toBeInTheDocument();
});