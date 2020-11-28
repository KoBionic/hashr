import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders App without error', () => {
  const tree = render(<App />);
  expect(tree).toMatchSnapshot();
});
