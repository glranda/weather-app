import { render, screen } from '@testing-library/react';
import App from './App';

// TODO - avoid using getByTestId
test('renders weather app', () => {
  render(<App />);
  screen.getByTestId("weatherApp");
});
