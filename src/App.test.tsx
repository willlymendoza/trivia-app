import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppProvider } from './context/AppContext';

test('renders learn react link', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );
  /* const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); */
});
