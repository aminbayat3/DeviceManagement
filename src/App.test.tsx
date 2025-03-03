import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { DeviceProvider } from './context/DeviceContext';
import { StatusProvider } from './context/StatusContext';

test('renders the app header', () => {
  render(
    <StatusProvider>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </StatusProvider>
  );

  // Test if the header text is rendered correctly
  expect(screen.getByText(/Device Management Dashboard/i)).toBeInTheDocument();
});
