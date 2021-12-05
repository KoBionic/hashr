import { render } from '@testing-library/react';
import config from 'renderer/config';
import App from './App';

config.version = '0.0.0';

test('renders App without error', () => {
  const tree = render(<App />);
  expect(tree).toMatchSnapshot();
});
